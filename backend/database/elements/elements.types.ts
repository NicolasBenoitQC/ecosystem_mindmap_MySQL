export interface IElement {
    ID?: number;
    TITLE: String;
    DESCRIPTION: String;
    POSITION: number;
    PARENT_ID: number;
    INTERVAL_INPUT: number;
    INTERVAL_OUTPUT: number;
    TREE_LEVEL: number;
    FILE_ID: number;
};

export interface IInsertedElement {
    request_description: string;
    error:boolean;
    message_error?: any;
    inserted_element?: any;
};

export interface IDeletedElements {
    request_description: string;
    error:boolean;
    message_error?: any;
    deleted_elements?: any;
};

export interface IUpdatedElements {
    request_description: string;
    error:boolean;
    message_error?: any;
    updated_elements?: any;
};

export interface IUpdateIntervalInput {
    request_description: string;
    error:boolean;
    message_error?: any;
    update_increase_interval_input?: any;
};

export interface IUpdateIntervalOutput {
    request_description: string;
    error:boolean;
    message_error?: any;
    update_increase_interval_output?: any;
};

export interface IGetElementsList {
    request_description: string;
    error:boolean;
    message_error?: any;
    elements_list?: any;
};

export interface IGetElement {
    request_description: string;
    error:boolean;
    message_error?: any;
    element?: any;
};

export interface IGetNodeAndItsBranchesByParentID {
    request_description: string;
    error:boolean;
    message_error?: any;
    node?: IGetElementsList;
    branches?: IGetElementsList;
};

export interface IOriginalElement {
    TITLE: String;
    DESCRIPTION: String;
    PARENT_ID: number;
    FILE_ID: number;
};

export interface ICreateOriginalElement {
    request_description: string;
    error:boolean;
    message_error?: any;
    origin_of_the_tree_created?: IInsertedElement;
};

export interface ICreateElement {
    request_description: string;
    error:boolean;
    message_error?: any;
    interval_input_updated?: IUpdateIntervalInput;
    interval_output_updated?: IUpdateIntervalOutput;
    element_created?: IInsertedElement;
};