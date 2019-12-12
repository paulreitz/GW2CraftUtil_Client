

export default class Dragger {
    draggableItems = {}

    makeElementDraggable(elementId, callback) {
        const element = document.getElementById(elementId);
        element.addEventListener('mousedown', this.onMouseDown);
        element.addEventListener('mouseup', this.onMouseUpOrExit);
        element.addEventListener('mouseleave', this.onMouseUpOrExit);
        element.classList.add('dragger--grab');
        this.draggableItems[elementId] = {
            element,
            callback,
            lastX: 0,
            lastY: 0
        };

    }

    findExistingElementId(element) {
        let nextLoop = true;
        let existingElement = element;
        let id = existingElement.id || '';
        while (nextLoop) {
            if (this.draggableItems[id]) {
                nextLoop = false;
                return id;
            }
            else {
                if (existingElement.parentElement) {
                    existingElement = existingElement.parentElement;
                    id = existingElement.id;
                }
                else {
                    nextLoop = false;
                    return undefined;
                }
            }
        }
    }

    onMouseDown = (e) => {
        const elementId = this.findExistingElementId(e.target);
        const element = document.getElementById(elementId);
        element.classList.remove('dragger--grab');
        element.classList.add('dragger--grabbing');
        element.addEventListener('mousemove', this.onMouseMove);
    }

    onMouseMove = (e) => {
        const elementId = this.findExistingElementId(e.target);
        this.draggableItems[elementId].callback(e.movementX, e.movementY);
    }

    onMouseUpOrExit = (e) => {
        const elementId = this.findExistingElementId(e.target);
        const element = document.getElementById(elementId);
        element.classList.remove('dragger--grabbing');
        element.classList.add('dragger--grab');
        element.removeEventListener('mousemove', this.onMouseMove);
    }
}