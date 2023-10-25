from flask import request, jsonify, send_from_directory, jsonify, request
from datetime import datetime
from flask_jwt_extended import jwt_required

import os
import uuid
import sys
sys.path.append('..')


def setup_routes(app):
    pass