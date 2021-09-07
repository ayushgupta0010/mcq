import graphene
from django.contrib.auth import get_user_model
from django.db.models import Q
from graphene_django import DjangoObjectType

from .models import Question, Answer

User = get_user_model()


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ['username', 'role']


class QuestionType(DjangoObjectType):
    class Meta:
        model = Question
        fields = '__all__'


class AnswerType(DjangoObjectType):
    class Meta:
        model = Answer
        fields = '__all__'


class Query(graphene.ObjectType):
    que_list_by_user = graphene.List(QuestionType)
    que_list_for_user = graphene.List(QuestionType)
    ans_list = graphene.List(AnswerType)

    def resolve_que_list_by_user(root, info):
        user = info.context.user
        questions = user.questions.all().order_by('-timestamp')
        return questions

    def resolve_que_list_for_user(root, info):
        user = info.context.user
        que_ans_by_user = list(user.answers.values_list('question__id', flat=True))
        questions = Question.objects.filter(~Q(id__in=que_ans_by_user))
        return questions

    def resolve_ans_list(root, info):
        user = info.context.user
        answers = Answer.objects.filter(user=user).order_by('-timestamp')
        return answers


class QuestionInput(graphene.InputObjectType):
    user = graphene.String(required=True)
    question_type = graphene.String(required=True)
    question = graphene.String(required=True)
    mcqOptionA = graphene.String()
    mcqOptionB = graphene.String()
    mcqOptionC = graphene.String()
    mcqOptionD = graphene.String()
    correct_answer = graphene.String(required=True)


class QuestionCreateMutation(graphene.Mutation):
    class Arguments:
        question_data = QuestionInput(required=True)

    question = graphene.Field(QuestionType)

    @classmethod
    def mutate(cls, root, info, question_data):
        question_data['user'] = User.objects.get(username=question_data['user'])
        question = Question.objects.create(**question_data)
        question.save()
        return QuestionCreateMutation(question=question)


class AnswerInput(graphene.InputObjectType):
    user = graphene.String(required=True)
    question = graphene.ID(required=True)
    answer = graphene.String(required=True)
    marks = graphene.Int(required=True)


class AnswerCreateMutation(graphene.Mutation):
    class Arguments:
        ans_data = AnswerInput(required=True)

    answer = graphene.Field(AnswerType)

    @classmethod
    def mutate(cls, root, info, ans_data):
        ans_data['user'] = User.objects.get(username=ans_data['user'])
        ans_data['question'] = Question.objects.get(id=ans_data['question'])
        answer = Answer.objects.create(**ans_data)
        answer.save()
        return AnswerCreateMutation(answer=answer)


class Mutation(graphene.ObjectType):
    create_que = QuestionCreateMutation.Field()
    create_ans = AnswerCreateMutation.Field()
