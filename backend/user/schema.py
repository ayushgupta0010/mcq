import graphene
from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
from graphql_auth import mutations
from graphql_auth.schema import UserQuery, MeQuery

User = get_user_model()


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ['id', 'username', 'role']


class Query(UserQuery, MeQuery, graphene.ObjectType):
    user_detail = graphene.Field(UserType, username=graphene.String())

    def resolve_user_detail(root, info, username):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return
        return user


class Mutation(graphene.ObjectType):
    signup = mutations.Register.Field()
    login = mutations.ObtainJSONWebToken.Field()
    verify_token = mutations.VerifyToken.Field()
    refresh_token = mutations.RefreshToken.Field()
    revoke_token = mutations.RevokeToken.Field()
