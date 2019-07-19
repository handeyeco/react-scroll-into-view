import React, { useRef, useEffect } from "react";
import { findDOMNode } from "react-dom";

export function ScrollIntoView({ scrollToUniqueId, children }) {
  // Store ref registry as a ref itself
  const registry = useRef({});
  useEffect(() => {
    // When scrollToUniqueId changes we grab the ref in the registry
    // use react-dom to find the underlying DOM node
    // and scroll to that node
    if (scrollToUniqueId !== undefined && scrollToUniqueId !== null) {
      const ref = registry.current[scrollToUniqueId];
      const node = ref ? findDOMNode(ref.current) : null;
      if (node) {
        node.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [registry, scrollToUniqueId]);

  // Passed to ScrollElement to register
  const register = (id, ref) => {
    registry.current[id] = ref;
  };

  // Passed to ScrollElement to unregister
  const unregister = id => {
    delete registry.current[id];
  };

  // Clone children adding registration functions to props
  return React.Children.map(children, child =>
    React.cloneElement(child, {
      register,
      unregister
    })
  );
}

export function ScrollElement({ uniqueId, register, unregister, children }) {
  // Create ref to register
  const ref = useRef(null);
  useEffect(() => {
    // Register on mount / changes
    register(uniqueId, ref);

    // Unregister on unmount
    return () => unregister(uniqueId);
  }, [uniqueId, ref, register, unregister]);

  // Clone child with ref added
  return React.cloneElement(children, { ref });
}
