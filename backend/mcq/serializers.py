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
        rep['question'] = instance.question.question
        rep['class'] = instance.question.cls
        rep['correct_answer'] = instance.question.correct_answer
        rep['isAnswerCorrect'] = instance.question.correct_answer == instance.answer
        rep['askedBy'] = instance.question.user.username
        rep['answeredBy'] = instance.user.username
        return rep
