import "./Product.css";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {BsFillEyeFill, BsFillCartCheckFill} from "react-icons/bs";
import { addToCart } from "../slices/cartSlice";
import { fetchProducts } from "../slices/productSlice";
import SkeletalLoading from "../components/SkeletalLoading";

const Products = () => {
  const { products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <>
      <div className="productBody">
        <section className="section">
          <div className="container">
            <div className="row justify-content-center section-heading">
              <div className="col-lg-6 text-center">
                <h3 className="h2 mt-2">Latest Arrivals</h3>
              </div>
            </div>
            <div className="row g-3 g-lg-4">
              {products && products.length > 0 ? (
                products.map((product, index) => {
                  return (
                    <div className="col-6 col-lg-3" key={product?.id || index}>
                      <div className="product-card-10">
                        <div className="product-card-image">
                          {/* <div className="badge-ribbon">
                              <span className="badge bg-danger">Sale</span>
                          </div> */}
                          <div className="product-media">
                            <a href="#">
                              <img
                                className="img-fluid"
                                src={
                                  product?.image ||
                                  "https://www.bootdey.com/image/380x380/FF00FF/000000"
                                }
                                title={product?.name || ""}
                                alt={product?.name || ""}
                              />
                            </a>
                          </div>
                        </div>
                        <div className="product-card-info">
                          <h6 className="product-title">
                            <a href="#">
                              {product?.title.length > 30
                                ? product?.title.substring(0, 26).concat("...")
                                : product?.title}
                            </a>
                          </h6>
                          <div className="product-price">
                            <span className="text-primary">
                              {/* 28.<small>50</small> */}
                              NPR {product?.price || ""}
                            </span>
                            {/* <del className="fs-sm text-muted">
                      $38.<small>50</small>
                    </del> */}
                          </div>
                          <div className="product-action">
                            <Link
                              className="btn"
                              to={`/products/${product?.id}`}
                            >
                              <BsFillEyeFill/>
                            </Link>
                            <button
                              className="btn"
                              onClick={() => {
                                dispatch(addToCart(product));
                              }}
                            >
                              <BsFillCartCheckFill/>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="container">
                  {products.length < 1 && loading ? (
                    <div className="row mt-4">
                      <div className="col">
                        <SkeletalLoading />
                      </div>
                      <div className="col">
                        <SkeletalLoading />
                      </div>
                      <div className="col">
                        <SkeletalLoading />
                      </div>
                      <div className="col">
                        <SkeletalLoading />
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 text-center text-primary">
                      No Products Found...
                    </div>
                  )}

                  {/*  */}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;