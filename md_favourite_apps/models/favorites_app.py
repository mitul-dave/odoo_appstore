from odoo import models, fields, api

class favorites_app(models.Model):
    _name = 'favorites_app'
    _description = 'Favorite App'

    favorites_user = fields.Many2one('res.users', string='User')
    app_name = fields.Char(string='App name')
    app_id = fields.Integer(string='App ID')
    is_starred = fields.Boolean(string='Is starred', default=False)
