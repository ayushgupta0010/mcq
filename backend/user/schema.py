import graphene
from django.contrib.auth import get_user_model
from django.db.models import Q
from graphene_django import DjangoObjectType
from graphql_auth import mutations
from graphql_auth.schema import MeQuery, UserQuery

User = get_user_model()


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ['id', 'username', 'role', 'isVerified']


class Query(MeQuery, UserQuery, graphene.ObjectType):
    list_unverified = graphene.List(UserType)

    def resolve_list_unverified(root, info):
        return User.objects.filter(Q(role='student') & Q(isVerified=False))


class UserVerifiedMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, username):
        user = User.objects.get(username=username)
        user.isVerified = True
        user.save()
        return UserVerifiedMutation(user=user)


class UserDeleteMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, username):
        user = User.objects.get(username=username)
        user.delete()


class Mutation(graphene.ObjectType):
    signup = mutations.Register.Field()
    login = mutations.ObtainJSONWebToken.Field()
    refresh_token = mutations.RefreshToken.Field()
    revoke_token = mutations.RevokeToken.Field()
    verify_user = UserVerifiedMutation.Field()
    delete_user = UserDeleteMutation.Field()
