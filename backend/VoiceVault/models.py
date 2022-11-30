from django.db import models


class Phrase(models.Model):
    text = models.TextField()

    def __str__(self):
        return self.text


class Session(models.Model):
    code = models.CharField(max_length=10, null=True, blank=True)
    expiration = models.DateTimeField()
    numberOfPhrases = models.IntegerField()

    def __str__(self):
        return self.code


def audio_file_organisation_path(instance, filename):
    return f'{instance.sex}/{instance.session.code}/{instance.phrase.id}_{filename}'


class Audio(models.Model):
    MALE = 'm'
    FEMALE = 'f'
    SEX_CHOICES = (
        (MALE, 'Male'),
        (FEMALE, 'Female'),
    )

    session = models.ForeignKey(Session, on_delete=models.SET_NULL, default=None, null=True)
    phrase = models.ForeignKey(Phrase, on_delete=models.SET_NULL, default=None, null=True)
    sex = models.CharField(choices=SEX_CHOICES, max_length=6, blank=True, null=True)
    file = models.FileField(upload_to=audio_file_organisation_path, blank=True, null=True)

    def __str__(self):
        return f'{self.sex}-{self.session_id}-{self.phrase_id}'
