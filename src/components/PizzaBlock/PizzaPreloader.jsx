import React from "react";
import ContentLoader from "react-content-loader"

const PizzaPreloader = () => (
<ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="142" cy="129" r="120" /> 
    <rect x="4" y="274" rx="6" ry="6" width="277" height="23" /> 
    <rect x="4" y="316" rx="10" ry="10" width="276" height="88" /> 
    <rect x="4" y="431" rx="5" ry="5" width="95" height="30" /> 
    <rect x="123" y="421" rx="24" ry="24" width="156" height="47" />
</ContentLoader>
)

export default PizzaPreloader;