import graphene
from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
from graphql_jwt import mutations

User = get_user_model()


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ['username', 'role']


class Query(graphene.ObjectType):
    user_detail = graphene.Field(UserType)

    def resolve_user_detail(root, info):
        user = info.context.user
        if user.is_authenticated:
            return user


class UserCreateMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        role = graphene.String(required=True)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, username, password, role):
        user = User.objects.create_user(username=username, password=password, role=role)
        user.save()
        return UserCreateMutation(user=user)


class Mutation(graphene.ObjectType):
    signup = UserCreateMutation.Field()
    login = mutations.ObtainJSONWebToken.Field()
    refresh_token = mutations.Refresh.Field()
    revoke_token = mutations.Revoke.Field()
