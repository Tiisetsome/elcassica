import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";

import UserContext from "../../context/users/userContext";
import ProductsContext from "../../context/products/productsContext";
import DashboardNavigation from "../../components/Navigation/DashboardNavigation";
import Container from "../../containers/Container";
import Progress from "../../components/UI/Progress";
import { KIDSHOP, MENSHOP, WOMENSHOP } from "../../HOC/constants/constants";
import BasicInfoForm from "../../components/dashboard/Products/BasicInfoForm";
import Tabs from "../../components/dashboard/Products/Tabs";
import ProductDisplay from "../../components/dashboard/Products/ProductDisplay";
import {
  clientValidation,
  isFormFieldInputEmpty,
  isImagesFieldInputEmpty,
  isVariationInputEmpty,
} from "../../HOC/validations/validationActions";
import ImagesForm from "../../components/dashboard/Products/ImagesForm";
import PricingForm from "../../components/dashboard/Products/PricingForm";
import InventoryForm from "../../components/dashboard/Products/InventoryForm";
import VariationsForm from "../../components/dashboard/Products/VariationsForm";
import ShippingForm from "../../components/dashboard/Products/ShippingForm";

const Product = () => {
  const userContext = useContext(UserContext);
  const productsContext = useContext(ProductsContext);
  const { userLogin, logOutUser } = userContext;
  const {
    mainImageDisplay,
    uploadedImages,
    uploadProductImages,
    addProduct,
    updateProduct,
  } = productsContext;

  const location = useLocation();
  const history = useHistory();

  if (
    location.state === "undefined" ||
    location?.state?.fromProducts === false
  ) {
    history.push("/dashboard");
  }

  clientValidation(history, userLogin, logOutUser);

  const [product, setProduct] = useState(
    history.location?.state?.productId
      ? history.location?.state?.productId
      : null
  );

  const [basicFormInput, setBasicForm] = useState({
    brand: product ? product.brand : "",
    type: product ? product.type : "",
    shop: product ? product.shop : MENSHOP.shop,
    category: product ? product.cartegory : MENSHOP.categories.suits,
    description: product ? product.description : "",
  });

  const [imagesFormInput, setImagesFormInput] = useState({
    mainImage: product ? product.imageUrl : [],
    swatches: [],
    updatingImages: product ? true : false,
  });

  const [pricesFormInput, setPricesFormInput] = useState({
    mainPrice: product ? product.price.toString() : "",
    stockPrice: product?.stockPrice ? product.stockPrice.toString() : "",
    salePrice: product ? "0" : "",
  });

  const [inventoryFormInput, setInventoryFormInput] = useState({
    stockKeepingUnit: product ? product.stockKeepingUnit : "",
    productBarcode: product ? product.barcode : "",
    stockQuantity: product ? product.quantity.toString() : "",
    manageStock: "false",
  });

  const [variationFormInput, setVariationFormInput] = useState({
    sizeInput: product ? product.sizes.join(",") : "",
    colorInput: product ? product.colors.join(",") : "",
    sizes: product ? product.sizes : [],
    colors: product ? product.colors : [],
    variationPrices: product
      ? product.sizes.map((size) => {
          return {
            [size]: product.price,
            sku: inventoryFormInput.stockKeepingUnit,
          };
        })
      : [],
  });

  const [shippingFormInput, setShippingFormInput] = useState({
    productWeight: "0",
    weightUnit: "Kilogram",
  });

  const [inputErrorMessage, setInputErrorMessage] = useState(null);

  const [trackProgress, setTrackProgress] = useState({
    basicInfo: true,
    productImgs: false,
    pricing: false,
    inventory: false,
    variations: false,
    shipping: false,
    productReady: false,
  });
  const [currentTab, setCurrentTab] = useState("tab-1");

  const changeTabHandler = (tab) => {
    setCurrentTab(tab);
  };

  const updateTrackAndTabProgress = (key) => {
    const trackProgressKeys = Object.keys(trackProgress);
    const trackProgressKeyIndex = trackProgressKeys.indexOf(key);
    if (trackProgressKeys.includes(key)) {
      setTrackProgress({
        ...trackProgress,
        [trackProgressKeys[trackProgressKeyIndex + 1]]: true,
      });
      setCurrentTab(`tab-${trackProgressKeyIndex + 2}`);
    }
  };

  const formatCategoryName = () => {
    let category = basicFormInput.category.toLowerCase();
    if (category === "t-shirts") {
      category = category.split("-")[1];
    }
    return category;
  };

  const formInputHandler = (name, event, formInputData, setFormInput) => {
    setFormInput({
      ...formInputData,
      [name]:
        name === "mainImage" || name === "swatches"
          ? [...event.target.files]
          : event.target.value,
    });
  };

  useEffect(() => {
    setBasicForm({
      ...basicFormInput,
      category:
        basicFormInput.shop === "menProducts"
          ? MENSHOP.categories.suits
          : basicFormInput.shop === "womenProducts"
          ? WOMENSHOP.categories.jeans
          : KIDSHOP.category,
    });
  }, [basicFormInput.shop]);

  const variationsFormInputHandler = (
    name,
    event,
    formInputData,
    setFormInput
  ) => {
    let userInput = event.target.value;

    setFormInput({
      ...formInputData,
      [name]: userInput,
      sizes:
        name === "sizeInput"
          ? userInput
              .split(",")
              .filter((word) => word.trim() !== "")
              .map((word) => word.trim())
          : variationFormInput.sizes,
      colors:
        name === "colorInput"
          ? userInput
              .split(",")
              .filter((word) => word.trim() !== "")
              .map((word) => word.trim())
          : variationFormInput.colors,
      variationPrices:
        name === "sizeInput"
          ? userInput
              .split(",")
              .filter((word) => word.trim() !== "")
              .map((word) => {
                let trimedWord = word.trim();
                return {
                  [trimedWord]: pricesFormInput.mainPrice,
                  sku: inventoryFormInput.stockKeepingUnit,
                };
              })
          : variationFormInput.variationPrices,
    });
  };

  const productVariationsOnchangeHandler = (name, event) => {
    variationFormInput.variationPrices.forEach((variation) => {
      if (Object.keys(variation).includes(name)) {
        variation[name] = event.target.value;
      }
    });

    setVariationFormInput({
      ...variationFormInput,
    });
  };

  const prepareAndUploadFiles = async (trackProgressKey) => {
    const { shop, category } = basicFormInput;
    const { mainImage, swatches } = imagesFormInput;
    const imageUploadDirectory =
      shop === MENSHOP.shop
        ? `uploads/men/${category}`
        : shop === WOMENSHOP.shop
        ? `uploads/women/${category}`
        : "uploads/kids/";
    const formData = new FormData();
    const allImages = [...mainImage, ...swatches];
    const allowedFileExtensions = ["jpg", "jpeg", "png"];

    const filesReady = allImages.every((file) => {
      const fileNameArr = file.name.split(".");
      const fileExtension = fileNameArr[fileNameArr.length - 1];
      if (allowedFileExtensions.includes(fileExtension.toLowerCase())) {
        file.uploadPath = `${imageUploadDirectory}/${file.name}`;
        formData.append(`file`, file);
        return true;
      } else {
        setInputErrorMessage("The file extension is not allowed!");
        return false;
      }
    });

    if (filesReady) {
      const imagesUploaded = await uploadProductImages(
        formData,
        userLogin.token,
        imageUploadDirectory
      );
      if (imagesUploaded) {
        updateTrackAndTabProgress(trackProgressKey);
        setInputErrorMessage(null);
      }
    }
  };

  const formSubmitHandler = async (e, buttonName, formInputData) => {
    e.preventDefault();
    if (
      buttonName !== "productImgs" &&
      !isFormFieldInputEmpty(formInputData, setInputErrorMessage)
    ) {
      setBasicForm({
        ...basicFormInput,
        category: formatCategoryName(),
      });
      updateTrackAndTabProgress(buttonName);
      setInputErrorMessage(null);
    } else if (
      buttonName === "productImgs" &&
      !imagesFormInput.updatingImages &&
      !isImagesFieldInputEmpty(imagesFormInput.mainImage, setInputErrorMessage)
    ) {
      prepareAndUploadFiles(buttonName);
    } else if (buttonName === "productImgs") {
      const mainImageIsArray = imagesFormInput.mainImage instanceof Array;
      if (mainImageIsArray && imagesFormInput.mainImage[0]?.name) {
        prepareAndUploadFiles(buttonName);
      } else {
        setImagesFormInput({
          ...imagesFormInput,
          swatches: product.imageSwatchesUrl,
        });
        updateTrackAndTabProgress(buttonName);
        setInputErrorMessage(null);
      }
    }
  };

  const createProductHandler = async () => {
    const capitalizeLetter = basicFormInput.category.charAt(0).toUpperCase();
    const newProduct = {
      brand: basicFormInput.brand,
      type: basicFormInput.type,
      cartegory:
        capitalizeLetter +
        basicFormInput.category.slice(1, basicFormInput.category.length),
      colors: variationFormInput.colors,
      imageUrl: mainImageDisplay.filePath,
      imageSwatchesUrl: uploadedImages.map((imgUrl) => imgUrl.filePath),
      imageUrlState: imagesFormInput.mainImage,
      imageSwatchesUrlState: imagesFormInput.swatches,
      sizes: variationFormInput.sizes,
      price: parseFloat(pricesFormInput.mainPrice),
      stockPrice: parseFloat(pricesFormInput.stockPrice),
      shop: basicFormInput.shop,
      description: basicFormInput.description,
      quantity: parseInt(inventoryFormInput.stockQuantity),
      stockKeepingUnit: inventoryFormInput.stockKeepingUnit,
      barcode: inventoryFormInput.productBarcode,
    };

    const productAdded = await addProduct(userLogin.token, newProduct);
    if (productAdded) {
      history.push("/dashboard/products");
    }
  };

  const updateProductHandler = async () => {
    const capitalizeLetter = basicFormInput.category.charAt(0).toUpperCase();
    const updateProductData = {
      brand: basicFormInput.brand,
      type: basicFormInput.type,
      cartegory:
        capitalizeLetter +
        basicFormInput.category.slice(1, basicFormInput.category.length),
      colors: variationFormInput.colors,
      imageUrl: mainImageDisplay
        ? mainImageDisplay.filePath
        : imagesFormInput.mainImage,
      imageSwatchesUrl: imagesFormInput.swatches,
      price: parseFloat(pricesFormInput.mainPrice),
      stockPrice: parseFloat(pricesFormInput.stockPrice),
      shop: basicFormInput.shop,
      description: basicFormInput.description,
      quantity: parseInt(inventoryFormInput.stockQuantity),
      stockKeepingUnit: inventoryFormInput.stockKeepingUnit,
      barcode: inventoryFormInput.productBarcode,
    };

    const productUpdated = await updateProduct(
      userLogin.token,
      updateProductData,
      product._id
    );
    if (productUpdated) {
      history.push("/dashboard/products");
    }
  };

  const tabsArray = ["tab-1", "tab-2", "tab-3", "tab-4", "tab-5", "tab-6"];

  return (
    <ProductStyles>
      <DashboardNavigation />
      <div className="dashboard-container">
        <Container label="Product" componentExists={false}>
          <Tabs
            currentTab={currentTab}
            trackProgress={trackProgress}
            changeTabHandler={changeTabHandler}
          />
          <div className="progress-note">Current Progress :</div>
          <Progress trackProgress={trackProgress} />
          <div className="product-details-wrapper">
            <ProductDisplay
              formData={{
                ...basicFormInput,
                ...pricesFormInput,
                quantity: inventoryFormInput.stockQuantity,
                sizes: variationFormInput.sizes,
                colors: variationFormInput.colors,
              }}
              mainImageDisplay={mainImageDisplay}
              productImages={uploadedImages}
              currentTab={currentTab}
              createProductHandler={createProductHandler}
              updateProductHandler={updateProductHandler}
              productUpdate={product}
            />
            {currentTab === tabsArray[0] ? (
              <BasicInfoForm
                basicFormInput={basicFormInput}
                formInputHandler={formInputHandler}
                formSubmitHandler={formSubmitHandler}
                inputErrorMessage={inputErrorMessage}
                setBasicForm={setBasicForm}
              />
            ) : currentTab === tabsArray[1] ? (
              <ImagesForm
                basicFormInput={imagesFormInput}
                formInputHandler={formInputHandler}
                formSubmitHandler={formSubmitHandler}
                inputErrorMessage={inputErrorMessage}
                setImagesFormInput={setImagesFormInput}
              />
            ) : currentTab === tabsArray[2] ? (
              <PricingForm
                basicFormInput={pricesFormInput}
                formInputHandler={formInputHandler}
                formSubmitHandler={formSubmitHandler}
                inputErrorMessage={inputErrorMessage}
                setPricesFormInput={setPricesFormInput}
              />
            ) : currentTab === tabsArray[3] ? (
              <InventoryForm
                basicFormInput={inventoryFormInput}
                formInputHandler={formInputHandler}
                formSubmitHandler={formSubmitHandler}
                inputErrorMessage={inputErrorMessage}
                setInventoryFormInput={setInventoryFormInput}
              />
            ) : currentTab === tabsArray[4] ? (
              <VariationsForm
                basicFormInput={{
                  sizeInput: variationFormInput.sizeInput,
                  colorInput: variationFormInput.colorInput,
                }}
                formInputHandler={variationsFormInputHandler}
                formSubmitHandler={formSubmitHandler}
                inputErrorMessage={inputErrorMessage}
                setVariationFormInput={setVariationFormInput}
                variations={{
                  sizes: variationFormInput.sizes,
                  colors: variationFormInput.colors,
                  variationPrices: variationFormInput.variationPrices,
                }}
                productVariationsOnchangeHandler={
                  productVariationsOnchangeHandler
                }
              />
            ) : (
              currentTab === tabsArray[5] && (
                <ShippingForm
                  basicFormInput={shippingFormInput}
                  formInputHandler={formInputHandler}
                  formSubmitHandler={formSubmitHandler}
                  inputErrorMessage={inputErrorMessage}
                  setShippingFormInput={setShippingFormInput}
                />
              )
            )}
          </div>
        </Container>
      </div>
    </ProductStyles>
  );
};

const ProductStyles = styled.main`
  background-color: var(--body-color);
  font-size: 0.8rem;
  font-family: Montserrat-Regular;
  color: var(--grey-color);

  .dashboard-container {
    padding: 5rem 0rem;

    .progress-note {
      margin-bottom: 2rem;
      text-align: center;
      font-size: 0.85rem;
      font-family: Montserrat-Semibold;
    }

    .product-details-wrapper {
      width: calc(100% - 4rem);
      margin: auto;
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 2rem;
    }
  }
`;

export default Product;
