
from odoo import models, fields

class menuCategory(models.Model) :
    _name = 'ir.ui.menu.category'
    _description = 'Menu category'
    _order = "sequence,id"

    name = fields.Char(string='Name', required=True, translate=True)
    sequence = fields.Integer(default=0)
