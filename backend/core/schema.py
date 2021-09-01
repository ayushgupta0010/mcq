import graphene

import mcq.schema
import user.schema


class Query(user.schema.Query, mcq.schema.Query, graphene.ObjectType):
    pass


class Mutation(user.schema.Mutation, mcq.schema.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
