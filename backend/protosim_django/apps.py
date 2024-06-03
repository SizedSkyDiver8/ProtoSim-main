# protosim_django/apps.py

from django.apps import AppConfig

class ProtosimDjangoAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'protosim_django'

    def ready(self):
        # This is where you import your signals
        from . import signals
