/** @odoo-module **/
import { HomeMenu } from "@web_enterprise/webclient/home_menu/home_menu";
// import { url } from "@web/core/utils/urls";
import { patch } from "@web/core/utils/patch";
import { jsonrpc } from "@web/core/network/rpc_service";
// import { computeAppsAndMenuItems } from "@web/webclient/menus/menu_helpers";
// import { Menus } from "@web/webclient/menus/menu_service";
// var rpc = require('web.rpc');

patch(HomeMenu.prototype,{
    setup() {
        // this._super();
        super.setup();
        this._favoriteMenu;
        // this._category = this.menus.getMenu("root").categorys;

    },

//    _updateQuery(query) {
//        // Update input and search state
//        this.state.query = query;
//        this.inputRef.el.value = this.state.query;
//        this.state.isSearching = true;
//
//        // Keep elements matching search query
//        if (query === "") {
////            this.availableApps = this.props.apps;
//            this.availableApps = this.props.apps;
//            this.displayedMenuItems = [];
//        } else {
//            this.availableApps = this._filter(this.props.apps);
//            this.displayedMenuItems = this._filter(this.props.menuItems);
//        }
//        const total = this.displayedApps.length + this.displayedMenuItems.length;
//        this.state.focusedIndex = total ? 0 : null;
//    },

    mounted() {
//        this._super();
        self.$Home = self.$('.o_home_menu')
        // self.$Home.toggleClass('o_search_hidden', false);
        this._favoriteMenu = $('.favoriteMenu').find('.o_apps');
        this._favoriteMenu.empty();
        // var group = window.localStorage.homemenu_group;
        // if (group == 'undefined') {
        //     window.localStorage.homemenu_group = false;
        // }
        // this._groupHomemenu(window.localStorage.homemenu_group === 'true');
        // $('#homemenugroup').prop('checked', window.localStorage.homemenu_group === 'true');
        this._laodfavorite();
        // this._checkGroups();
        // this._updateScrollBarWidth();
//        location.reload();
    },
        /**
         * @private
         */
//    render() {
//        this._super();
//        self.$Home = self.$('.o_home_menu')
//        self.$Home.toggleClass('o_search_hidden', false);
//        this._favoriteMenu = $('.favoriteMenu').find('.o_apps');
//        this._favoriteMenu.empty();
//        var group = window.localStorage.homemenu_group;
////        if (!group) {
//        if (group == 'undefined') {
//            window.localStorage.homemenu_group = false;
//        }
//        this._groupHomemenu(window.localStorage.homemenu_group === 'true');
//        $('#homemenugroup').prop('checked', window.localStorage.homemenu_group === 'true');
//        this._laodfavorite();
//        this._checkGroups();
//        location.reload();
//    },

    // _checkGroups:function(){
    //     var self = this;
    //     for (let i = 0; i < self._category.length; i++) {
    //         var divCategory = $("[divcategory='" + self._category[i][0] + "']");
    //         if (divCategory.length > 0) {
    //             var o_apps = $(divCategory[0]).find('.o_apps');

    //             var showapps = o_apps.find('.o_app:visible');

    //             if (showapps.length === 0) {
    //                 divCategory.hide();
    //             }
    //         }
    //     }
    // },
    _onClickAppStar (e) {
        e.stopPropagation()
        var self = this;
        var menuItem = $(e.currentTarget).closest('.o_app');
        var menuID = $(e.currentTarget).attr('data-menu');

        if (menuID !== undefined) {
            menuID = parseInt(menuID);
//             this.rpc({
// //                self._rpc({
//                 model: 'ir.ui.menu',
//                 method: 'set_favorites',
//                 args: [menuID],
//             }).then(function (result) {
// //                for (let i = 0; i < self._state.apps.length; i++) {
//                 for (let i = 0; i < self.availableApps.length; i++) {
// //                    if(self._state.apps[i].id === menuID) {
//                     if(self.availableApps[i].id === menuID) {
//                         self.availableApps[i].isFavorite = result;
//                     }
//                 }
// //                self.mounted();
//                 location.reload();
//             });

            const favourite = jsonrpc('/set_favorites', {
                model: 'ir.ui.menu',
                method: 'set_favorites',
                kwargs: {menuID},
                }).then(function (result) {
//                for (let i = 0; i < self._state.apps.length; i++) {
                for (let i = 0; i < self.availableApps.length; i++) {
//                    if(self._state.apps[i].id === menuID) {
                    if(self.availableApps[i].id === menuID) {
                        self.availableApps[i].isFavorite = result;
                    }
                }
//                self.mounted();
                location.reload();
            })
        }
    },
    _laodfavorite(e) {
//        $('.app_star').off('click').on('click',  this._onClickAppStar.bind(this))
        var appfavorite = $("[isFavorite='true']").not('.apphiden');
        appfavorite.clone().appendTo(this._favoriteMenu);
        appfavorite.hide();
        $('.favoriteMenu').find('.app_star').off('click').on('click',  this._onClickAppStar.bind(this))
        $('.groups').find('.app_star').off('click').on('click',  this._onClickAppStar.bind(this))


    },
//     _onChangeGroup (e) {
//         var self = this;
//         window.localStorage.homemenu_group = $(e.currentTarget).prop('checked');
// //        self.mounted();
//         location.reload();
//     },
//     _groupHomemenu: function (group) {
//         if (group) {
//             this._sortAppsGroup();
//         } else {
//             this._unsortAppsGroup();
//         }
//     },
//     _sortAppsGroup() {
//         var self = this;
//         for (let i = 0; i < self._category.length; i++) {
//             var divCategory = $("[divcategory='" + self._category[i][0] + "']");
//             if (divCategory.length > 0) {
//                 var o_apps = $(divCategory[0]).find('.o_apps');
//                 var appCategory = $("[appcategory='" + self._category[i][0] + "']");
//                 if (appCategory.length > 0) {
//                     divCategory.show();
//                     for (let j = 0; j < appCategory.length; j++) {
//                         var element = $(appCategory[j]).clone();
//                         o_apps.append(element);
//                         $(appCategory[j]).hide();
//                         $(appCategory[j]).addClass('apphiden')
//                     }
//                 } else {
//                     divCategory.hide();
//                 }
//             }
//         }
//     },
//     _unsortAppsGroup() {
//         var self = this;
//         var apphiden = $(".apphiden");
//         apphiden.show();
//         apphiden.removeClass('apphiden');
//         for (let i = 0; i < self._category.length; i++) {
//             var divCategory = $("[divcategory='" + self._category[i][0] + "']");

//             if (divCategory.length > 0) {
//                 var appCategory = divCategory.find('.o_app');

//                 if (appCategory.length > 0) {
//                     appCategory.hide();
//                     appCategory.remove();
//                 }
//                 divCategory.hide();
//             }
//         }
//     },
//    _processMenuData: function (menuData) {
//        var result = [];
//        utils.traversePath(menuData, function (menuItem, parents) {
//            if (!menuItem.id || !menuItem.action) {
//                return;
//            }
//            var item = {
//                parents: _.pluck(parents.slice(1), 'name').join(' / '),
//                label: menuItem.name,
//                id: menuItem.id,
//                xmlid: menuItem.xmlid,
//                action: menuItem.action ? menuItem.action.split(',')[1] : '',
//                is_app: !menuItem.parent_id,
//                web_icon: menuItem.web_icon,
//                category: menuItem.category ? menuItem.category[0] : '',
//                isFavorite: menuItem.isFavorite,
//            };
//            if (!menuItem.parent_id) {
//                if (menuItem.web_icon_data) {
//                    item.web_icon_data =
//                        ('data:image/png;base64,' + menuItem.web_icon_data).replace(/\s/g, "");
//                } else if (item.web_icon) {
//                    var iconData = item.web_icon.split(',');
//                    item.web_icon = {
//                        class: iconData[0],
//                        color: iconData[1],
//                        background: iconData[2],
//                    };
//                } else {
//                    item.web_icon_data = '/web_enterprise/static/src/img/default_icon_app.png';
//                }
//            } else {
//                item.menu_id = parents[1].id;
//            }
//            result.push(item);
//        });
//
//        return result;
//    },


});

// HomeMenu.props = {
//     apps: {
//         type: Array,
//         element: {
//             type: Object,
//             shape: {
//                 actionID: Number,
//                 appID: Number,
//                 id: Number,
//                 label: String,
//                 parents: String,
//                 webIcon: [
//                     Boolean,
//                     String,
//                     {
//                         type: Object,
//                         optional: 1,
//                         shape: {
//                             iconClass: String,
//                             color: String,
//                             backgroundColor: String,
//                         },
//                     },
//                 ],
//                 webIconData: { type: String, optional: 1 },
//                 xmlid: String,
//                 // category: Object,
//                 isFavorite: {
//                     type: Boolean,
//                     optional: true
//                 },
//             },
//         },
//     },
//     menuItems: {
//         type: Array,
//         element: {
//             type: Object,
//             shape: {
//                 actionID: Number,
//                 appID: Number,
//                 id: Number,
//                 label: String,
//                 menuID: Number,
//                 parents: String,
//                 xmlid: String,
//                 // category: Object,
//                 isFavorite: {
//                     type: Boolean,
//                     optional: true
//                 },
//             },
//         },
//     },
// };

HomeMenu.props = {
    apps: {
        type: Array,
        element: {
            type: Object,
            shape: {
                actionID: Number,
                appID: Number,
                id: Number,
                label: String,
                parents: String,
                webIcon: {
                    type: [
                        Boolean,
                        String,
                        {
                            type: Object,
                            optional: 1,
                            shape: {
                                iconClass: String,
                                color: String,
                                backgroundColor: String,
                                isFavorite: {
                                    type: Boolean,
                                    optional: true
                                },
                            },
                        },
                    ],
                    optional: true,
                },
                webIconData: { type: String, optional: 1 },
                xmlid: String,
            },
        },
    },
};




//
//
//odoo.define('web_enterprise.HomeMenu_evo', function (require) {
//    "use strict";
//
//    var config = require('web.config');
//    var core = require('web.core');
//    var utils = require('web.utils');
//    var HomeMenu = require('@web_enterprise/webclient/home_menu/home_menu');
//    var rpc = require('web.rpc');
//    var _t = core._t;
//
//    HomeMenu.include({
//        events: {
//            'click .app_star': '_onClickAppStar',
//            'change #homemenugroup': '_onChangeGroup',
//        },
//        init: function (parent, menuData) {
//            this._super.apply(this, arguments);
//            this._category = menuData.categorys;
//            this._favoriteMenu;
//        },
//        /**
//         * @private
//         */
//        _render: function () {
//            this._super.apply(this, arguments);
//            this.$menuSearch.toggleClass('o_bar_hidden', false);
//            this._favoriteMenu = $('.favoriteMenu').find('.o_apps');
//            this._favoriteMenu.empty();
//
//            var group = window.localStorage.homemenu_group;
//            if (!group) {
//                window.localStorage.homemenu_group = false;
//            }
//            this._groupHomemenu(window.localStorage.homemenu_group === 'true');
//            $('#homemenugroup').prop('checked', window.localStorage.homemenu_group === 'true');
//
//            this._laodfavorite();
//            this._checkGroups();
//        },
//        _checkGroups:function(){
//            var self = this;
//            for (let i = 0; i < self._category.length; i++) {
//                var divCategory = $("[divcategory='" + self._category[i][0] + "']");
//                if (divCategory.length > 0) {
//                    var o_apps = $(divCategory[0]).find('.o_apps');
//                    var showapps = o_apps.find('.o_app:visible');
//                    if (showapps.length === 0) {
//                        divCategory.hide();
//                    }
//                }
//            }
//        },
//        _onClickAppStar: function (e) {
//            var self = this;
//            var menuItem = $(e.currentTarget).closest('.o_app');
//            var menuID = menuItem.find('.o_menuitem').attr('data-menu');
//
//            if (menuID !== undefined) {
//                menuID = parseInt(menuID);
//                rpc.query({
//                    model: 'ir.ui.menu',
//                    method: 'set_favorites',
//                    args: [menuID],
//                }).then(function (result) {
//                    for (let i = 0; i < self._state.apps.length; i++) {
//                        if(self._state.apps[i].id === menuID) {
//                            self._state.apps[i].isFavorite = result;
//                        }
//                    }
//                    self._render();
//                });
//            }
//        },
//        _laodfavorite: function (e) {
//            var appfavorite = $("[isFavorite='true']").not('.apphiden');
//            appfavorite.clone().appendTo(this._favoriteMenu);
//            appfavorite.hide();
//        },
//        _onChangeGroup: function (e) {
//            window.localStorage.homemenu_group = $(e.currentTarget).prop('checked');
//            this._render();
//        },
//        _groupHomemenu: function (group) {
//            if (group) {
//                this._sortAppsGroup();
//            } else {
//                this._unsortAppsGroup();
//            }
//        },
//        _sortAppsGroup() {
//            var self = this;
//            for (let i = 0; i < self._category.length; i++) {
//                var divCategory = $("[divcategory='" + self._category[i][0] + "']");
//                if (divCategory.length > 0) {
//                    var o_apps = $(divCategory[0]).find('.o_apps');
//                    var appCategory = $("[appcategory='" + self._category[i][0] + "']");
//
//                    if (appCategory.length > 0) {
//                        divCategory.show();
//                        for (let j = 0; j < appCategory.length; j++) {
//                            var element = $(appCategory[j]).clone();
//                            o_apps.append(element);
//                            $(appCategory[j]).hide();
//                            $(appCategory[j]).addClass('apphiden')
//                        }
//                    } else {
//                        divCategory.hide();
//                    }
//                }
//            }
//        },
//        _unsortAppsGroup() {
//            var self = this;
//            var apphiden = $(".apphiden");
//            apphiden.show('fast');
//            apphiden.removeClass('apphiden');
//
//            for (let i = 0; i < self._category.length; i++) {
//                var divCategory = $("[divcategory='" + self._category[i][0] + "']");
//                if (divCategory.length > 0) {
//                    var appCategory = divCategory.find('.o_app');
//                    if (appCategory.length > 0) {
//                        appCategory.hide();
//                        appCategory.remove();
//                    }
//                    divCategory.hide();
//                }
//            }
//        },
//        _processMenuData: function (menuData) {
//            var result = [];
//            utils.traversePath(menuData, function (menuItem, parents) {
//                if (!menuItem.id || !menuItem.action) {
//                    return;
//                }
//                var item = {
//                    parents: _.pluck(parents.slice(1), 'name').join(' / '),
//                    label: menuItem.name,
//                    id: menuItem.id,
//                    xmlid: menuItem.xmlid,
//                    action: menuItem.action ? menuItem.action.split(',')[1] : '',
//                    is_app: !menuItem.parent_id,
//                    web_icon: menuItem.web_icon,
//                    category: menuItem.category ? menuItem.category[0] : '',
//                    isFavorite: menuItem.isFavorite,
//                };
//                if (!menuItem.parent_id) {
//                    if (menuItem.web_icon_data) {
//                        item.web_icon_data =
//                            ('data:image/png;base64,' + menuItem.web_icon_data).replace(/\s/g, "");
//                    } else if (item.web_icon) {
//                        var iconData = item.web_icon.split(',');
//                        item.web_icon = {
//                            class: iconData[0],
//                            color: iconData[1],
//                            background: iconData[2],
//                        };
//                    } else {
//                        item.web_icon_data = '/web_enterprise/static/src/img/default_icon_app.png';
//                    }
//                } else {
//                    item.menu_id = parents[1].id;
//                }
//                result.push(item);
//            });
//
//            return result;
//        },
//
//
//    })
//});
