import React from 'react';
import { useInView } from "react-cool-inview";
import ProductCard from './ProductCard'
import { Button, Center, Spinner } from '@chakra-ui/react';

const App = ({ context, getProductsByIds }) => {
    const productIds = context.productResults.products.map(p => p.id)
    const productsPerPage = 9;

    const [cursor, setCursor] = React.useState(0)
    const [hasMoreProducts, setHasMoreProducts] = React.useState(true)
    const [productData, setProductData] = React.useState([])
    const [loading, setLoading] = React.useState(true);

    const handleLoadMore = function () {
        const numPages = Math.ceil(context.productResults.products.length / productsPerPage); //rounds up
        const hasMore = (cursor + 1) < numPages;

        if (hasMore) {
            setCursor(cursor + 1)
        }
        else {
            setHasMoreProducts(false)
        }
    }

    const { observe } = useInView({
        // For better UX, we can grow the root margin so the data will be loaded earlier
        rootMargin: "700px 0px",
        onEnter: () => {
            // Load more data
            handleLoadMore()
        },
    });

    React.useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const res = await getProductsByIds(productIds, cursor, context.token, productsPerPage)
                setProductData([
                    ...productData,
                    ...res.data.site.products.edges
                ])
                setLoading(false)
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [cursor])

    return (
        <>
            {productData && !!productData.length && (
                <>
                    <ul className="productGrid">
                        {productData.map((v, index) => (
                            <ProductCard data={v} key={`productCard_${index}`} />
                        ))}
                    </ul>
                    {hasMoreProducts && (
                        <Center>
                            <Button disabled={loading} variant="ghost" fontWeight='normal' fontSize='14px' className="button button--small" ref={observe} onClick={handleLoadMore}>Load More</Button>
                        </Center>
                    )}
                </>
            )}
            {loading && (
                <Center>
                    <Spinner />
                </Center>
            )}
        </>
    )
}

export default App;