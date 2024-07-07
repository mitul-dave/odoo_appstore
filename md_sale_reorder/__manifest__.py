# -*- coding: utf-8 -*-
{
    "name": "Sale Reorder",
    "version": "17.0.0.1",
    "summary": "Reorder products from previous sale order or sale quotations",
    'sequence': 1,
    "discription": """
        The "Sale Reorder" module in Odoo is designed to streamline the process of reordering products from previous sales orders or sales quotations. This module is ideal for businesses that frequently need to reorder items based on past transactions, enabling a more efficient and accurate reorder process.
    """,
    "author": "Odoo Class",
    "website": "",
    "license": "LGPL-3",
    "category": "Sales",
    "depends": ["base", "sale_management"],
    "data": [
        "security/ir.model.access.csv",
        "views/sale_order_inherit.xml",
        "wizard/sale_reorder_view.xml"
    ],
    "image": ['static/description/banner.png'],
    "installable": True,
    "auto_install": False,
    "application": True,
}