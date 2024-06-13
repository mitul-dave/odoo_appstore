# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
import operator

from odoo import api, models, fields, _
from odoo.osv import expression


class IrUiMenu(models.Model):
    _inherit = 'ir.ui.menu'

    category = fields.Many2one('ir.ui.menu.category', string='Category')

    @api.model
    def load_menus(self, debug):
        """ Loads all menu items (all applications and their sub-menus).

        :return: the menu root
        :rtype: dict('children': menu_nodes)
        """
        fields = ['name', 'sequence', 'parent_id', 'action', 'web_icon', 'web_icon_data', 'category']
        menu_roots = self.get_user_roots()
        menu_roots_data = menu_roots.read(fields) if menu_roots else []
        menu_root = {
            'id': False,
            'name': 'root',
            'parent_id': [-1, ''],
            'children': [menu['id'] for menu in menu_roots_data],
        }

        all_menus = {'root': menu_root}

        if not menu_roots_data:
            return all_menus

        categorys = []
        menus_red = self.env['ir.ui.menu.category'].search([], order="sequence ASC")
        if menus_red:
            for category in menus_red:
                categorys.append((category.id, category.sequence, category.name))
        # categorys.insert(0, _('Favorite'))
        menu_root['categorys'] = categorys
        # menus are loaded fully unlike a regular tree view, cause there are a
        # limited number of items (752 when all 6.1 addons are installed)
        menus_domain = [('id', 'child_of', menu_roots.ids)]
        blacklisted_menu_ids = self._load_menus_blacklist()
        if blacklisted_menu_ids:
            menus_domain = expression.AND([menus_domain, [('id', 'not in', blacklisted_menu_ids)]])
        menus = self.search(menus_domain)
        menu_items = menus.read(fields)
        xmlids = (menu_roots + menus)._get_menuitems_xmlids()

        # add roots at the end of the sequence, so that they will overwrite
        # equivalent menu items from full menu read when put into id:item
        # mapping, resulting in children being correctly set on the roots.
        menu_items.extend(menu_roots_data)

        # set children ids and xmlids
        menu_items_map = {menu_item["id"]: menu_item for menu_item in menu_items}
        for menu_item in menu_items:

            favorites_app = self.env['favorites_app'].sudo().search(
                [('favorites_user', '=', self.env.user.id), ('app_id', '=', menu_item['id'])])
            if favorites_app:
                menu_item['isFavorite'] = favorites_app.is_starred
            else:
                menu_item['isFavorite'] = False

            menu_item.setdefault('children', [])
            parent = menu_item['parent_id'] and menu_item['parent_id'][0]
            menu_item['xmlid'] = xmlids.get(menu_item['id'], "")
            if parent in menu_items_map:
                menu_items_map[parent].setdefault(
                    'children', []).append(menu_item['id'])
        all_menus.update(menu_items_map)

        # sort by sequence
        for menu_id in all_menus:
            all_menus[menu_id]['children'].sort(key=lambda id: all_menus[id]['sequence'])

        # recursively set app ids to related children
        def _set_app_id(app_id, menu):
            menu['app_id'] = app_id
            for child_id in menu['children']:
                _set_app_id(app_id, all_menus[child_id])

        for app in menu_roots_data:
            app_id = app['id']
            _set_app_id(app_id, all_menus[app_id])

        # filter out menus not related to an app (+ keep root menu)
        all_menus = {menu['id']: menu for menu in all_menus.values() if menu.get('app_id')}
        all_menus['root'] = menu_root
        return all_menus

    def load_web_menus(self, debug):
        menus = self.load_menus(debug)
        res = super().load_web_menus(debug)
        for menu in res:
            if  res[menu]['id'] == 'root':
                res[menu]['categorys'] = menus[res[menu]['id']]['categorys']
                # res[menu]['isFavorite'] = False

            else:
                res[menu]['category'] = menus[res[menu]['id']]['category'] if menus[res[menu]['id']]['category'] else []
                res[menu]['isFavorite'] = menus[res[menu]['id']]['isFavorite']
        return res


    # @api.model
    # def load_menus(self, debug):
    #     """ Loads all menu items (all applications and their sub-menus).
    #
    #     :return: the menu root
    #     :rtype: dict('children': menu_nodes)
    #     """
    #     fields = ['name', 'sequence', 'parent_id', 'action', 'web_icon', 'web_icon_data', 'category']
    #     menu_roots = self.get_user_roots()
    #     menu_roots_data = menu_roots.read(fields) if menu_roots else []
    #     menu_root = {
    #         'id': False,
    #         'name': 'root',
    #         'parent_id': [-1, ''],
    #         'children': menu_roots_data,
    #         'all_menu_ids': menu_roots.ids,
    #     }
    #
    #     if not menu_roots_data:
    #         return menu_root
    #
    #     # menus are loaded fully unlike a regular tree view, cause there are a
    #     # limited number of items (752 when all 6.1 addons are installed)
    #     menus = self.search([('id', 'child_of', menu_roots.ids)])
    #     menu_items = menus.read(fields)
    #
    #     categorys = []
    #     menus_red = self.env['ir.ui.menu.category'].search([], order="sequence ASC")
    #     if menus_red:
    #         for category in menus_red:
    #             categorys.append((category.id, category.sequence, category.name))
    #
    #     # categorys.insert(0, _('Favorite'))
    #     menu_root['categorys'] = categorys
    #
    #     # add roots at the end of the sequence, so that they will overwrite
    #     # equivalent menu items from full menu read when put into id:item
    #     # mapping, resulting in children being correctly set on the roots.
    #     menu_items.extend(menu_roots_data)
    #     menu_root['all_menu_ids'] = menus.ids  # includes menu_roots!
    #
    #     # make a tree using parent_id
    #     menu_items_map = {menu_item["id"]: menu_item for menu_item in menu_items}
    #     for menu_item in menu_items:
    #         favorites_app = self.env['favorites_app'].sudo().search(
    #             [('favorites_user', '=', self.env.user.id), ('app_id', '=', menu_item['id'])])
    #         if favorites_app:
    #             menu_item['isFavorite'] = favorites_app.is_starred
    #         else:
    #             menu_item['isFavorite'] = False
    #
    #         parent = menu_item['parent_id'] and menu_item['parent_id'][0]
    #         if parent in menu_items_map:
    #             menu_items_map[parent].setdefault(
    #                 'children', []).append(menu_item)
    #
    #     # sort by sequence a tree using parent_id
    #     for menu_item in menu_items:
    #         menu_item.setdefault('children', []).sort(key=operator.itemgetter('sequence'))
    #
    #     #(menu_roots + menus)._set_menuitems_xmlids(menu_root)
    #
    #     return menu_root

    @api.model
    def set_favorites(self, menuid):
        menu = self.browse(menuid)
        if menu:
            favorites_app = self.env['favorites_app'].sudo().search(
                [('favorites_user', '=', self.env.user.id), ('app_id', '=', menu.id)])
            if favorites_app:
                favorites_app.is_starred = not favorites_app.is_starred
                return favorites_app.is_starred
            else:
                app = self.env['favorites_app'].create({
                    'favorites_user': self.env.user.id,
                    'app_name': menu.name,
                    'is_starred': True,
                    'app_id': menu.id
                })
                if app:
                    return True
                else:
                    return False
        return False
