{
    "name": "Web Enterprise Favourite Apps",
    "version": "17.0.0.1",
    "summary": "",
    'sequence': 1,
    "description": """
        """,
    "author": "Dave Groups",
    "website": "",
    "license": "LGPL-3",
    "category": "Technical",   
    "depends": ["base", "web", "web_enterprise",],
    "css": [],
    "data": [
    ],
    "assets": {
        "web.assets_backend": [
            # "md_favourit_apps/static/src/js/home_menu.js",
            # "md_favourit_apps/static/src/js/home_items.js",
            # ("replace", "web_enterprise/static/src/webclient/home_menu/home_menu_service.js", "md_favourit_apps/static/src/js/home_menu_service.js"),
            # "md_favourit_apps/static/src/scss/home_menu.scss",
        ],

        'web.assets_backend': [
            'md_favourite_apps/static/src/webclient/**/*.scss',
            'md_favourite_apps/static/src/webclient/**/*.js',
            'md_favourite_apps/static/src/webclient/**/*.xml',
        ],
        "web.assets_qweb": [
            # "md_favourit_apps/static/src/xml/base.xml",
        ],
    },

    "images": ["static/description/icon.png"],
    "installable": True,
    "auto_install": False,
    "application": True,
}