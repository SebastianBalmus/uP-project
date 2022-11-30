import string
import random
from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Session


def code_generator(size=10, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


@receiver(pre_save, sender=Session)
def generate_session_code(sender, instance, *args, **kwargs):

    code = code_generator()
    while Session.objects.filter(code=code).count() != 0:
        code = code_generator()

    instance.code = code
