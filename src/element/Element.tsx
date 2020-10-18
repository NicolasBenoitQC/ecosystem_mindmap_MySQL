// Framwork
import React from 'react';

// Local file
import './Element.css'
import { WidthSvgViewBox, HeightSvgViewBox } from '../svg-setting'
import { IElement } from '../elements.client.types';

// Typing of the properties of the elements component.
export interface ElementProps {
    elementProps: IElement;
    quantityElements: number;
    actionDoubleClick: any;
}

// ---------------------------------------------------------------------------------------
// Elements component. This element generate the elements around the center element of the mind map. 
// ---------------------------------------------------------------------------------------
export const Element: React.FC<ElementProps> = ({
                elementProps, quantityElements, actionDoubleClick,
    }) => {

    // setting of the template svg.
    const rotationFormula = 2*Math.PI/(quantityElements *2);
    const originX = WidthSvgViewBox / 2;
    const originY = HeightSvgViewBox / 2;
    const radiusAxisRotation = originX / 4;
    const radiusElement = originX / 12;
    const positionIdElement = elementProps.POSITION;

    const centerOfElementX = originX + ((radiusAxisRotation) * Math.sin(rotationFormula * positionIdElement));
    const centerOfElementY = originY - ((radiusAxisRotation) * Math.cos(rotationFormula * positionIdElement));
    
    const widthTitleField = radiusElement * 2;
    const heightTitleField = radiusElement * 2;

/* ---------------------------------------------------------------------------------------------------
------------- Render -----------------------------------------------------------------------------    
------------------------------------------------------------------------------------------------------ */
    return (
        <svg>
            <circle className='elements'
                key={positionIdElement}
                cx={centerOfElementX}
                cy={centerOfElementY}
                r={radiusElement}
                stroke='white'
                strokeWidth='0.1'
                fill='gray'
            />
            <foreignObject
                x={centerOfElementX-radiusElement}
                y={centerOfElementY-radiusElement}
                width={widthTitleField}
                height={heightTitleField}
                fontSize='10%'
                >
                <div className='container-element-title' >
                    <div className='element-title'>
                        {elementProps.TITLE}
                    </div>
                </div>
            </foreignObject>
            <circle className='elementsLayer'
                key={positionIdElement+2}
                cx={centerOfElementX}
                cy={centerOfElementY}
                r={radiusElement}
                fillOpacity='0'
                onDoubleClick={() => actionDoubleClick(elementProps)}
            />
        </svg>
    )
};