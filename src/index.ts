import p5 from "p5";

export const sketch = (p: p5) => {
  p.setup = () => {
    const canvas = p.createCanvas(400, 400, p.WEBGL);
    canvas.parent("sketch-container"); // Better DOM management
  };

  p.draw = () => {
    p.background(220);
    p.ellipse(0, 0, 80, 80); // Adjusted for WEBGL center origin
  };
};

// Create a container div for better structure
const sketchContainer = document.createElement("div");
sketchContainer.id = "sketch-container";
document.body.appendChild(sketchContainer);

// Initialize p5 in instance mode with proper typing
export const myp5 = new p5(sketch, sketchContainer);
