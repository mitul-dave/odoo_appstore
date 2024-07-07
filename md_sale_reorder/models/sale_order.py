# -*- coding: utf-8 -*-
from odoo import models
from odoo.tools.translate import _


class SaleOrder(models.Model):

    _inherit = 'sale.order'

    def action_sale_reorder(self):
        return {
            'name': _("Sale Reorder"),
            'type': 'ir.actions.act_window',
            'view_mode': 'form',
            'res_model': 'wizard.sale.reorder',
            'target': 'new',
            'context': {'order_id': self.id}
        }