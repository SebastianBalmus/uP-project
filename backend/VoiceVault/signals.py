import string
import random
from django.db.models.functions import Random
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from .models import Session, Audio, Phrase


def code_generator(size=10, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


@receiver(pre_save, sender=Session)
def generate_session_code(sender, instance, *args, **kwargs):

    code = code_generator()
    while Session.objects.filter(code=code).count() != 0:
        code = code_generator()

    if instance.code is None:
        instance.code = code


@receiver(post_save, sender=Session)
def generate_session_audios(sender, instance, *args, **kwargs):

    existing_audios = Audio.objects.filter(session=instance.id)

    if not existing_audios:
        audio_count = instance.numberOfPhrases
        phrases = Phrase.objects.annotate(random=Random()).order_by('random')[:audio_count]
        Audio.objects.bulk_create([Audio(session=instance, phrase=phrase) for phrase in phrases])
