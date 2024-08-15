// import { CSSProperties, FunctionComponent, ReactElement } from 'react';
// import styles from './Loader.module.scss';

// interface ComponentLoaderProps {

//     /**
//      * If you want to use a custom style for the loader, pass the style as an object
//      */
//     style?: CSSProperties

//     isSmallLoader?: boolean

//     /**
//      * If you want to use a light theme for the loader, pass this prop as true
//      */
//     lightTheme?: boolean

//     /**
//      * If you want to use a custom color for the loader, pass the color as a string.
//      */
//     customLoaderColor?: string

//     /**
//      * If you want to use a custom background color for the loader, pass the color as a string. 
//      * This will override the default background color of the loader.
//      * Ideal for buttons
//      */
//     customBackground?: string

//     scale?: number
// }

// const ComponentLoader: FunctionComponent<ComponentLoaderProps> = (
//     { style, lightTheme, customBackground, customLoaderColor, isSmallLoader, scale }): ReactElement => {
//     const loaderStyle = isSmallLoader ? { width: '24px', height: '24px', borderWidth: '3px', scale: scale ?? 1 } : {};

//     return (
//         <>
//             <div className="grid place-items-center" style={customBackground ? { position: 'absolute', backgroundColor: `${customBackground}`, width: '100%', height: '100%', left: 0, top: 0 } : {}}>
//                 <span className=" w-12 h-12 border-4 border-b-primary rounded-full grid place-items-center box-border animate-spin"
//                     style={customLoaderColor ? { ...loaderStyle } : { ...loaderStyle, borderColor: `${customLoaderColor ? customLoaderColor : '#8133F1'}` }}
//                 />
//             </div>
//         </>
//     );
// }

// export default ComponentLoader;

import { FunctionComponent, ReactElement } from 'react';

type ComponentLoaderProps = {

    /**
     * The optional classnames to be added
     */
    className?: string
}

type FullPageLoaderProps = ComponentLoaderProps & {
    containerClassName?: string
}

export const ComponentLoader: FunctionComponent<ComponentLoaderProps> = (
    { className }): ReactElement => {

    return (
        <div className={`w-16 h-16 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin ${className}`} />
    );
}

export const ButtonLoader: FunctionComponent<ComponentLoaderProps> = (
    { className }): ReactElement => {

    return (
        <div className='absolute w-full h-full top-0 left-0 bg-primary grid place-items-center pointer-events-none'>
            <div className={`w-6 h-6 border-4 border-white border-t-transparent border-solid rounded-full animate-spin ${className}`} />
        </div>
    );
}

export const FullPageLoader: FunctionComponent<FullPageLoaderProps> = (
    { className, containerClassName }): ReactElement => {

    return (
        <div className={`h-52 w-full grid place-items-center ${containerClassName}`}>
            <div className={`w-12 h-12 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin ${className}`} />
        </div>
    );
}