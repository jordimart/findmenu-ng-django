from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from ..restaurants.models import Restaurant
from ..restaurants.serializers import RestaurantSerializer


class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


# @csrf_exempt
def restaurant_list(request):
    print(request)
    if request.method == 'GET':
        restaurants = Restaurant.objects.all()
        serializer = RestaurantSerializer(restaurants, many=True)
        return JSONResponse(serializer.data)

    elif request.method == 'POST':
        print(request)
        data = JSONParser().parse(request)
        serializer = RestaurantSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        print('bad')
        return JSONResponse(serializer.errors, status=400)


# @csrf_exempt
def restaurant_detail(request, pk):

    try:
        restaurant = Restaurant.objects.get(pk=pk)
    except Restaurant.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = RestaurantSerializer(restaurant)
        return JSONResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = RestaurantSerializer(restaurant, data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data)
        return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        restaurant.delete()
        return HttpResponse(status=204)