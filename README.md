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

4)  Get all products by a category.

    ### /product/get

    - Get all product by category or categories

    ```javascript
    {
        "categories": ["/samsung"]
    }
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
