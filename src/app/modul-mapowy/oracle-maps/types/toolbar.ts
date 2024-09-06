/**
 * The ToolBar class defines a draggable toolbar that is a container for
 multiple control buttons. Each button controls an Oracle Maps
 built-in tool (such as the Circle, Rectangle, or Redline tool)
 or a custom/user-defined one. Each button must also have associated event handlers for
 responding to mouse, touch, or other events.
 The toolbar can be displayed in two orientations, vertical or horizontal.

 The built-in tools are : Redline, Distance,
 Circle, Rectangle, and Marquee Zoom. The application can choose
 to display control buttons for all or some of these built-in tools in the toolbar.

 The tool bar can also hold custom tool buttons for application
 specific operations.

 A tool button has one of the following two types:


 COMMAND: A command button has only one state, UP, and always reacts to mouse
 clicks by invoking the same BUTTON_DOWN event listener.

 TOGGLE: A toggle button has two states, DOWN and UP. The initial state of
 the button is UP. Its state changes to DOWN after it is clicked.
 It stays DOWN until it is clicked again, after which its state
 changes to UP. The BUTTON_DOWN event listener is invoked when the
 button state changes from UP to DOWN. The BUTTON_UP event listener
 is invoked when the button state changes from DOWN to UP.

 SEPERATOR: A seperator simply displays a static seperator icon that does not
 react to any user actions.
 Multiple buttons are organized as a button group,
 and only one button can be in the DOWN (or enabled) state at any time. Enabling a
 button will automatically disable (i.e. change state from DOWN to UP) the other currently enabled button if any.
 All built-in tool buttons, except the Marquee Zoom button, are TOGGLE type buttons organized in the
 same button group. The Marquee Zoom button is a TOGGLE type button, but does not belong to any
 button group.
 */
export interface Toolbar {
  toolBarID: string;
  options: any;

  // TODO dodać opisy funkcji
}
