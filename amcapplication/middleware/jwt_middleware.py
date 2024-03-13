
from django.http import JsonResponse
from jwt_utils import decode_jwt_token  

class JWTMiddleware:
    def __init__(self, get_response):

        self.get_response = get_response

    def __call__(self, request):
       
        excluded_views = ['signup', 'signin']
        path = request.path_info.lstrip('/').lower()

        if any(view in path for view in excluded_views):
            response = self.get_response(request)
            return response
        
        
        token = request.headers.get('Authorization', '').split(' ')[-1]

        if not token:
            return JsonResponse({'error': 'Token not provided'}, status=401)

        
        decoded_token = decode_jwt_token(token)

        if not decoded_token:
            return JsonResponse({'error': 'Invalid token'}, status=401)

        # Attach the decoded token to the request for use in views
        request.decoded_token = decoded_token

        response = self.get_response(request)
        return response
