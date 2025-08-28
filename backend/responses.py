from fastapi.responses import JSONResponse

def response_success(message: str, status: int = 201):
    return JSONResponse(
        status_code=status,
        content={"message": message}
    )

def response_error(message: str, status: int = 400):
    return JSONResponse(
        status_code=status,
        content={"message": message}
    )

def response_data(data: dict, status: int = 200):
    return JSONResponse(
        status_code=status,
        content=data
    )

def response_created(item: str, status: int = 201):
    return JSONResponse(
        status_code=status,
        content={"message": f"{item} created successfully"}
    )

def response_already_exists(item: str, status: int = 400):
    return JSONResponse(
        status_code=status,
        content={"message": f"{item} already exists!"}
    )
