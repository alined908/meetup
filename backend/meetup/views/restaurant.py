from meetup.models import (
    Restaurant,
    RestaurantCategory,
    Review,
    Comment,
    Category,
    Vote
)
from django.http import Http404
from meetup.serializers import (
    RestaurantSerializer,
    ReviewSerializer,
    CommentSerializer,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist


class RestaurantListView(APIView):
    permission_clases = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        coords, categories = [
            request.GET.get("latitude"),
            request.GET.get("longitude"),
            request.GET.get("radius"),
        ], request.GET.get("categories", [])
        restaurants = Restaurant.get_nearby(coords, request, categories)
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)


class RestaurantView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        restaurant_url = kwargs['uri']

        try:
            restaurant = Restaurant.objects.get(url=restaurant_url)
        except Restaurant.DoesNotExist:
            return Response({"error": "Restaurant does not exist."}, status=404)

        serializer = RestaurantSerializer(restaurant)

        return Response(serializer.data)

class ReviewListView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        restaurant_url = kwargs['uri']

        try:
            restaurant = Restaurant.objects.get(url=restaurant_url)
        except Restaurant.DoesNotExist:
            return Response({"error": "Restaurant does not exist."}, status=404)

        serializer = ReviewSerializer(
            restaurant.reviews.all().order_by("-vote_score"), many=True
        )
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        user = request.user
        restaurant_url = kwargs['uri']

        try:
            restaurant = Restaurant.objects.get(url=restaurant_url)
        except Restaurant.DoesNotExist:
            return Response({"error": "Restaurant does not exist."}, status=404)

        review = Review.objects.create(
            user=user, 
            text= request.data["text"], 
            rating=request.data["rating"], 
            restaurant=restaurant
        )

        serializer = ReviewSerializer(review)

        return Response(serializer.data)

class ReviewView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):
        restaurant_url = kwargs['uri']

        try:
            restaurant = Restaurant.objects.get(url=restaurant_url)
        except Restaurant.DoesNotExist:
            return Response({"error": "Restaurant does not exist."}, status=404)

        review_id = kwargs['review_id']

        try:
            review = Review.objects.get(restaurant=restaurant, pk=review_id)
        except Review.DoesNotExist:
            return Response({"error": "Review does not exist."}, status=404)

        serializer = ReviewSerializer(review)
        return Response(serializer.data)

class CommentListView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request, *args, **kwargs):

        user = request.user

        review_id = kwargs['review_id']

        try:
            review = Review.objects.get(pk=review_id)
        except Review.DoesNotExist:
            return Response({"error": "Review does not exist."}, status=404)
    
        parent_id = request.data.get("parent")

        if parent_id:
            parent = Comment.objects.get(pk=parent_id)
        else:
            parent = None

        comment = Comment.objects.create(
            user=user,
            text=request.data['text'],
            review=review,
            parent=parent,
        )

        serializer = CommentSerializer(comment)

        return Response(serializer.data)

class CommentView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, *args, **kwargs):

        review_id = kwargs['review_id']
        comment_id = kwargs['comment_id']

        try:
            comment = Comment.objects.get(review=review_id, pk=comment_id)
        except Comment.DoesNotExist:
            return Response({"error": "Comment does not exist."}, status=404)

        serializer = CommentSerializer(comment)

        return Response(serializer.data)


class VoteView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request, *args, **kwargs):
        user = request.user
        value = request.data.get('value')

        if request.data.get("review"):
            review_id = request.data.get("review")
            votable = Review.objects.get(pk=review_id)
        else:
            comment_id = request.data.get("comment")
            votable = Comment.objects.get(pk=comment_id)

        try:
            vote = Vote.objects.get(
                user = user, 
                content_type = votable.get_content_type(), 
                object_id = votable.id
            )
            vote.handle_vote(value)
        except Vote.DoesNotExist:
            vote = Vote.objects.create(user = user, content_object = votable, value = value)

        return Response(status=status.HTTP_204_NO_CONTENT)
