from rest_framework import serializers
from meetup.serializers import UserSerializer
from .utils import GenericActivityRelatedField
from meetup.models import User, Meetup, Friendship, Review, Restaurant, MeetupEvent, MeetupMember
from social.models import Activity, Post, ActivityComment, ActivityLike

class ActivitySerializer(serializers.ModelSerializer):
    actor = GenericActivityRelatedField(read_only=True)
    target = GenericActivityRelatedField(read_only=True)
    action_object = GenericActivityRelatedField(read_only=True)
    comments = serializers.SerializerMethodField("_get_comments")
    like = serializers.SerializerMethodField("_get_like")

    def _get_comments(self, obj):
        top = ActivityComment.objects.filter(activity=obj, parent=None)
        serializer = ActivityCommentSerializer(top, many=True)
        return serializer.data
    
    def _get_like(self, obj):
        user = self.context.get("user")

        if user and not user.is_anonymous:
            try:
                like = ActivityLike.objects.get(
                    user = user, 
                    activity=obj
                )
                return like.status
            except ActivityLike.DoesNotExist:
                return None
        else:
            return None

    class Meta:
        model = Activity
        fields = (
            "id",
            "actor",
            "verb",
            "action_object",
            "target",
            "description",
            'comments',
            'like',
            'comment_count',
            'likes_count',
            "created_at",
        )

class ActivityCommentSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField("_get_children")
    user = serializers.SerializerMethodField("_get_user")

    def _get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, context={"plain": True})
        return serializer.data

    def _get_children(self, obj):
        serializer = ActivityCommentSerializer(obj.children, many=True)
        return serializer.data

    class Meta:
        model = ActivityComment
        fields = ('id', 'activity', 'children', 'user', 'text', 'vote_score', 'created_at', 'updated_at')