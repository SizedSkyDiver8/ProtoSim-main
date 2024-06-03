# __init__.py
import django
import os

django.setup()

# Import signal handlers to ensure they are connected
from . import signals
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'protosim_django.settings')
default_app_config = 'protosim_django.apps.ProtosimDjangoAppConfig'
