import graphene
from django.contrib.auth import get_user_model
from graphql_auth import mutations
from graphql_auth.schema import MeQuery, UserQuery

User = get_user_model()


class Query(MeQuery, UserQuery, graphene.ObjectType):
    pass


class Mutation(graphene.ObjectType):
    signup = mutations.Register.Field()
    login = mutations.ObtainJSONWebToken.Field()
    refresh_token = mutations.RefreshToken.Field()
