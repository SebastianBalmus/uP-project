from VoiceVault.models import Phrase, Session, Audio
from rest_framework import serializers


class PhraseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Phrase
        fields = ['url', 'id', 'text']


class AudioSerializer(serializers.HyperlinkedModelSerializer):
    session = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=Session.objects.all()
    )
    phrase = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=Phrase.objects.all()
    )

    class Meta:
        model = Audio
        fields = ['url', 'id', 'session', 'phrase', 'sex', 'file']


class JoinSessionSerializer(serializers.Serializer):
    sessionCode = serializers.CharField(required=True)


class SessionSerializer(serializers.HyperlinkedModelSerializer):

    submittedAudios = serializers.SerializerMethodField('get_submitted_audios')
    pendingAudios = serializers.SerializerMethodField('get_pending_audios')

    class Meta:
        model = Session
        fields = ['url', 'id', 'code', 'expiration', 'numberOfPhrases', 'submittedAudios', 'pendingAudios']

    @staticmethod
    def get_submitted_audios(session):
        audios = Audio.objects.filter(
            session=session.id
        ).values_list('id', flat=True).exclude(
            file=''
        ).order_by('id')
        return audios

    @staticmethod
    def get_pending_audios(session):
        audios = Audio.objects.filter(
            session=session.id,
            file=''
        ).values_list('id', flat=True).order_by('id')
        return audios


class SelectGenderSerializer(serializers.Serializer):
    MALE = 'M'
    FEMALE = 'F'
    SEX_CHOICES = (
        (MALE, 'Male'),
        (FEMALE, 'Female'),
    )

    sessionCode = serializers.CharField(required=True)
    sex = serializers.ChoiceField(choices=SEX_CHOICES)


class GetPhraseSerializer(serializers.Serializer):
    audioId = serializers.IntegerField(required=True)
