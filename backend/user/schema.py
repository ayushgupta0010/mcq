import graphene
from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
from graphql_auth import mutations
from graphql_auth.schema import UserQuery, MeQuery

User = get_user_model()


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ['id', 'username', 'role', 'isVerified']


class Query(UserQuery, MeQuery, graphene.ObjectType):
    user_detail = graphene.Field(UserType, username=graphene.String())
    list_unverified = graphene.List(UserType)

    def resolve_user_detail(root, info, username):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return
        return user

    def resolve_list_unverified(root, info):
        return User.objects.filter(isVerified=False)


class UserVerifiedMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, username):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return
        user.isVerified = True
        user.save()
        return UserVerifiedMutation(user=user)


class UserDeleteMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, username):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return
        user.delete()


class Mutation(graphene.ObjectType):
    verify_user = UserVerifiedMutation.Field()
    delete_user = UserDeleteMutation.Field()
    signup = mutations.Register.Field()
    login = mutations.ObtainJSONWebToken.Field()
    verify_token = mutations.VerifyToken.Field()
    refresh_token = mutations.RefreshToken.Field()
    revoke_token = mutations.RevokeToken.Field()
