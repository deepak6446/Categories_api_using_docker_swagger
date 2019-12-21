# What is this?

It contains API's for create, update operations for categories and product

# How to start

docker-compose up -d

# Why docker?

Docker enables developers to easily pack, ship, and run any application as a lightweight, portable, self-sufficient container, which can run virtually anywhere.

# API's

1.  Add a category

    ### /category/add

    - Add mobiles category

    ```javascript
    {
        "parent_category": "/",
        "category_name": "/mobiles"
    }
    ```

    - Add samsung category in mobile

    ```javascript
    {
        "parent_category": "/mobiles",
        "category_name": "/samsung"
    }
    ```

2)  Add Product mapped to a category or categories.

    ### /product/add

    - Add Product samsung-galaxy-a in samsung category

      ```javascript
      {
        "categories": ["/samsung"],
        "product_name": "samsung-galaxy-a",
        "price": 4356.50
      }
      ```

3)  Get all categories with all its child categories mapped to it. Note : Each
    category object should look something like this {Id : 1 , child_categories:
    [], ...}

    ### /category/get
    
    - Get all category
        
        ```javascript
        [{
            "_id": "5dfdc8d7b0fe8f00142bb693",
            "parent_categories": "/",
            "category": "/mobiles",
            "child_categories": [
                "5dfdc8dab0fe8f00142bb694"
            ]
        },
        {
            "_id": "5dfdc8dab0fe8f00142bb694",
            "parent_categories": "/mobiles",
            "category": "/samsung",
            "child_categories": []
        }]
        ```

4)  Get all products by a category.

    ### /product/get

    - Get all product by category or categories

        ```javascript
        {
            "categories": ["/samsung"]
        }
        ```

        ```javascript
        [{
            "_id": "5dfdbe93f8d6d600133b64ed",
            "price": 4356.5,
            "categories": [
                "/samsung"
            ],
            "product": "new name",
            "__v": 0
        },
        {
            "_id": "5dfdc0b724e1a800137ffa9c",
            "price": 4356.5,
            "categories": [
                "/samsung"
            ],
            "product": "samsung-galaxy-a22s",
            "__v": 0
        }]

        ```

5.  Update product details (name,price,etc)

    ### /product/update

    - Update categories

    ```javascript
    {
        "product_update_name": "new name",
        "product_name": "samsung-galaxy-a22s",
        "price": 78889
    }
    ```

```

```
