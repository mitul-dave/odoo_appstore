from odoo import http
from odoo.http import request

import logging
_logger = logging.getLogger(__name__)

class WebEditorController(http.Controller):

    @http.route(['/set_favorites_app'], type='json', auth="user", website=True)
    def set_favorites_snippet(self, snippet_title=None, is_starred=False):
        if snippet_title:
            snippet = request.env['favorites_snippet'].sudo().search(['&',('title', '=', snippet_title),('favorites_user', '=', request.env.user.id)],limit=1)
            if snippet:
                snippet.write({'is_starred': is_starred})
            else:
                request.env['favorites_snippet'].sudo().create({'title': snippet_title,'favorites_user': request.env.user.id, 'is_starred': is_starred})
            return {'result': True}
        else:
            return {'result': False}

    @http.route(['/set_favorites'], type='json', auth="user", website=True)
    def set_favorites(self, **kw):
        import pdb
        pdb.set_trace()
        menuid = kw.get('kwargs').get('menuID')
        menu = request.env['ir.ui.menu'].sudo().search([('id', '=', menuid)])
        if menu:
            favorites_app = request.env['favorites_app'].sudo().search(
                [('favorites_user', '=', self.env.user.id), ('app_id', '=', menu.id)])
            if favorites_app:
                favorites_app.is_starred = not favorites_app.is_starred
                return favorites_app.is_starred
            else:
                app = request.env['favorites_app'].create({
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