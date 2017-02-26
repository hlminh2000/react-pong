# React-Pong
<!-- ## H2
### H3
#### H4
##### H5
###### H6 -->

A pong game built with React and my little experimental implementation of Flux.

A live version of this is hosted at: https://react-pong.herokuapp.com/

### Game Features
- Your paddle can go off the screen (yes it's harder that way)
- Playback! You can re-watch just how you lost the game

### Technical Features
- Built with React
- A simple experimental implementation of Flux
	- Immutable state (although the store can be cleared)
	- Singleton store manager with a store provider component
	- State manipulation through actions
	- Built-in replay interface in store manager - currently only handles linear-time replay through frame state restoration

### Current Technical Limitations
- Components are accessing store directly, hence they are currently non-reusable
- linear-time replay doesn't support non keyframe-driven applications

### What's coming next
- Slo-mo replay
- Action-driven replay system (real-time replay support for non keyframe-driven applications)
- Component container layer to support reusable visual components

### What will come one day
- Multi-player through web socket


<!-- Alt-H1 -->
<!-- ====== -->

<!-- Alt-H2 -->
<!-- ------ -->
