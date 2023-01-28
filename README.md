# React Redux Notes

## react state normalization

## State Shape

1. Normalization means no duplicaton of data
2. Creates an ID lookup
{
    posts:
    {
        ids:[1,2,3,4,5],
        entities:{
            '1':{
                userId:1,
                id:1,
                title:..
            }
        }
    }
}
 React redux toolkit provides a createEntityAdapter API that abstracts more logic for components
 builtin CRUD methods
 Automatic selector generation

## Example Project

<https://www.positronx.io/react-redux-handle-api-calls-with-thunk-middleware-tutorial/>
