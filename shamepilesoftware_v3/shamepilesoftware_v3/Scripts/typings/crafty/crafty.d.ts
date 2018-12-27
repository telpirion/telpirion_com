interface ICrafty {
     /**
     * Creates a component where the first argument is the ID and the second
     * is the object that will be inherited by entities.
     * 
     * @param name Name of the component
     * @param component Object with the component's properties and methods
     */
    c: (name: string, component: Object) => void;

     /**
     * Creates an entity. Any arguments will be applied in the same
     * way `.addComponent()` is applied as a quick way to add components.
     * 
     * @param componentList List of components to assign to new entity
     * @param component Component to add
     *
     */
    e: (componentList?: string) => Entity;

    /**
     * Sets the element to use as the stage, creating it if necessary.
     * 
     * @param width The width of the stage.
     * @param height The height of the stage.
     * @param stage_elem [String or HTMLElement] The element to use as the stage.
     */
    init: (width: Number, height: Number, stage_elem: any) => ICrafty;
    
}

interface Entity {
    Data: { id: number}
} 

declare var Crafty: ICrafty;