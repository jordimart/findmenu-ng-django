from django.conf.urls import url, include
from rest_framework_nested import routers
from .views import LoginAPIView, RegistrationAPIView, UserRetrieveUpdateAPIView, LogoutView

router = routers.SimpleRouter()
router.register(r'accounts', RegistrationAPIView)
# router.register(r'posts', PostViewSet)
accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)
# accounts_router.register(r'posts', AccountPostsViewSet)


urlpatterns = [
    url(r'^user/?$', UserRetrieveUpdateAPIView.as_view()),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/users/login/?$', LoginAPIView.as_view()),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
]
