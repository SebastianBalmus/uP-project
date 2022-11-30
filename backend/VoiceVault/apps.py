from django.apps import AppConfig
from django.db.models.signals import pre_save


class VoicevaultConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'VoiceVault'

    def ready(self):
        session_model = self.get_model('Session')
        from . import signals
        pre_save.connect(signals.generate_session_code, session_model)

