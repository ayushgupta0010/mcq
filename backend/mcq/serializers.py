from rest_framework import serializers

from .models import Question, Answer


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(QuestionSerializer, self).to_representation(instance)
        rep['type'] = 'question'
        rep['user'] = instance.user.username
        return rep


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(AnswerSerializer, self).to_representation(instance)
        rep['type'] = 'answer'
        rep['question'] = QuestionSerializer(instance.question).data
        return rep
