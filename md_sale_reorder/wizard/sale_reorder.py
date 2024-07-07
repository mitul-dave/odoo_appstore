from odoo import api, fields, models, _

class WizardSaleReorder(models.TransientModel):
    _name = "wizard.sale.reorder"
    _description = "Sale Reorder"

    customer_id = fields.Many2one("res.partner", string="Customer Name")
    order_id = fields.Many2one("sale.order", string="Sale Order")

    @api.model
    def default_get(self, fields):
        res = super(WizardSaleReorder, self).default_get(fields)
        partner_id = self.env['sale.order'].browse(self._context.get('active_id')).partner_id
        res.update({
            'customer_id': partner_id.id,
        })
        return res


    def action_reorder(self):
        active_order = self.env['sale.order'].browse(self._context.get('active_id'))
        result = self.env['sale.order'].search([('id', '=', self.order_id.id)])
        vals = []
        for current_order in active_order:
            for selected_order in result.order_line:
                vals.append((0, 0, {
                    'product_id': selected_order.product_id.id,
                    'product_template_id': selected_order.product_template_id.id,
                    'name': selected_order.name,
                    'product_uom_qty': selected_order.product_uom_qty,
                    'customer_lead': selected_order.customer_lead,
                    'price_unit': selected_order.price_unit,
                    'price_subtotal': selected_order.price_subtotal,
                    'price_total': selected_order.price_total
                }))
        current_order.order_line = vals