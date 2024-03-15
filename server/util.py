import json
import pickle
import numpy as np
__location = None
__model = None
__data_columns = None

def get_estimate_price(location, sqft, bath, bhk):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index=-1
    x = np.zeros(len(__data_columns))
    x[0]=sqft
    x[1]=bath
    x[2]=bhk
    
    if loc_index >= 0:
        x[loc_index]=1

    return round(__model.predict([x])[0],2)

def load_saved_artifacts():
    print("Load saved artifacts ... start")
    # biến toàn cục
    global __data_columns
    global __location
    global __model

    with open('./server/artifacts/columns.json', 'r') as f:
        __data_columns = json.load(f)['data_columns']
        # 3 là vị trí của location
        __location = __data_columns[3:]

    with open('./server/artifacts/banglore_home_prices_model.pickle', 'rb') as f:
        __model = pickle.load(f)
    print('Load saved artifacts ... done')

def get_location_names():
    return __location

if __name__ == "__main__":
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimate_price('location_1st phase jp nagar', 1000, 3,3))
    # print(get_estimate_price('location_1st phase jp nagar', 1000, 2,2))
    # print(get_estimate_price('location_anjanapura', 1000, 2,2))
    # print(get_estimate_price('location_binny pete', 1000, 2,2))