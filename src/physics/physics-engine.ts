export interface Vector2 {
  x: number;
  y: number;
}

export class Point {
  public position: Vector2;
  public oldPosition: Vector2;
  public pinned: boolean = false;
  public mass: number = 1;
  public radius: number = 10;
  
  constructor(x: number, y: number, mass: number = 1, pinned: boolean = false) {
    this.position = { x, y };
    this.oldPosition = { x, y };
    this.mass = mass;
    this.pinned = pinned;
  }
}

export class Constraint {
  public p0: Point;
  public p1: Point;
  public length: number;
  public stiffness: number; // 1 for rigid sticks, < 1 for springs
  
  constructor(p0: Point, p1: Point, length?: number, stiffness: number = 1) {
    this.p0 = p0;
    this.p1 = p1;
    this.length = length ?? this.distance(p0, p1);
    this.stiffness = stiffness;
  }
  
  private distance(p0: Point, p1: Point): number {
    const dx = p0.position.x - p1.position.x;
    const dy = p0.position.y - p1.position.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public resolve() {
    const dx = this.p1.position.x - this.p0.position.x;
    const dy = this.p1.position.y - this.p0.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance === 0) return;
    
    const difference = this.length - distance;
    const percent = difference / distance / 2;
    
    // If one is pinned, the other must move twice as much to satisfy constraint
    const p0Weight = this.p0.pinned ? 0 : (this.p1.pinned ? 2 : 1);
    const p1Weight = this.p1.pinned ? 0 : (this.p0.pinned ? 2 : 1);
    
    const offsetX = dx * percent * this.stiffness;
    const offsetY = dy * percent * this.stiffness;
    
    if (!this.p0.pinned) {
      this.p0.position.x -= offsetX * p0Weight;
      this.p0.position.y -= offsetY * p0Weight;
    }
    if (!this.p1.pinned) {
      this.p1.position.x += offsetX * p1Weight;
      this.p1.position.y += offsetY * p1Weight;
    }
  }
}

export class VerletEngine {
  public points: Point[] = [];
  public constraints: Constraint[] = [];
  
  public gravity: Vector2 = { x: 0, y: 0.125 };
  public friction: number = 0.98;
  public bounce: number = 0.9;
  public elapsed: number = 0;
  
  public bounds: { width: number; height: number } | null = null;
  
  // Custom external force (e.g., wind or flick)
  public externalForce: Vector2 = { x: 0, y: 0 };
  
  public mousePosition: Vector2 | null = null;
  public mouseVelocity: Vector2 = { x: 0, y: 0 };
  
  constructor(bounds?: { width: number; height: number }) {
    this.bounds = bounds || null;
  }
  
  public addPoint(point: Point) {
    this.points.push(point);
  }
  
  public addConstraint(constraint: Constraint) {
    this.constraints.push(constraint);
  }
  
  public update(delta: number = 1 / 120, iterations: number = 5) {
    this.elapsed += delta;
    this.updatePoints();
    for (let i = 0; i < iterations; i++) {
      this.updateConstraints();
      this.updateBounds();
    }
  }
  
  private updatePoints() {
    const s = 0.0035 * Math.sin(this.elapsed * 0.55) + 0.002 * Math.sin(this.elapsed * 1.3 + 0.8);
    const numPoints = this.points.length > 1 ? this.points.length : 2; // avoid division by zero

    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      if (p.pinned) continue;
      
      const vx = (p.position.x - p.oldPosition.x) * this.friction;
      const vy = (p.position.y - p.oldPosition.y) * this.friction;
      
      p.oldPosition.x = p.position.x;
      p.oldPosition.y = p.position.y;
      
      // Apply sway noise scaled by node index
      const noise = s * (i / (numPoints - 1));

      // Apply forces
      p.position.x += vx + this.gravity.x + this.externalForce.x / p.mass + noise;
      p.position.y += vy + this.gravity.y + this.externalForce.y / p.mass;

      // Mouse repulsion
      if (this.mousePosition && !p.pinned) {
        const dx = p.position.x - this.mousePosition.x;
        const dy = p.position.y - this.mousePosition.y;
        const distSq = dx * dx + dy * dy;
        const isCharm = i === numPoints - 1;
        const maxDist = 40;
        
        if (distSq < maxDist * maxDist && distSq > 1) {
          const dist = Math.sqrt(distSq);
          if (isCharm) {
            const u = (maxDist - dist) / maxDist;
            const xAmt = u * u * 0.4;
            const yAmt = u * 0.1;
            const pushX = (dx / dist) * xAmt + Math.max(-14, Math.min(14, this.mouseVelocity.x)) * yAmt;
            const pushY = (dy / dist) * xAmt + Math.max(-14, Math.min(14, this.mouseVelocity.y)) * yAmt;
            p.position.x += pushX;
            p.position.y += pushY * 0.35;
          } else {
            const pushAmt = ((maxDist - dist) / maxDist) * 0.8;
            p.position.x += (dx / dist) * pushAmt;
            p.position.y += (dy / dist) * pushAmt;
          }
        }
      }
    }
    
    // Reset external force per tick
    this.externalForce = { x: 0, y: 0 };
  }
  
  private updateConstraints() {
    for (const c of this.constraints) {
      c.resolve();
    }
  }
  
  private updateBounds() {
    if (!this.bounds) return;
    
    for (const p of this.points) {
      if (p.pinned) continue;
      
      const vx = (p.position.x - p.oldPosition.x) * this.friction;
      const vy = (p.position.y - p.oldPosition.y) * this.friction;
      
      if (p.position.x > this.bounds.width - p.radius) {
        p.position.x = this.bounds.width - p.radius;
        p.oldPosition.x = p.position.x + vx * this.bounce;
      } else if (p.position.x < p.radius) {
        p.position.x = p.radius;
        p.oldPosition.x = p.position.x + vx * this.bounce;
      }
      
      if (p.position.y > this.bounds.height - p.radius) {
        p.position.y = this.bounds.height - p.radius;
        p.oldPosition.y = p.position.y + vy * this.bounce;
      } else if (p.position.y < p.radius) {
        p.position.y = p.radius;
        p.oldPosition.y = p.position.y + vy * this.bounce;
      }
    }
  }
  
  public applyForce(force: Vector2) {
    this.externalForce.x += force.x;
    this.externalForce.y += force.y;
  }
  
  public getCharmAngle(): number {
    // Assuming p0 is anchor and the last point is the bob
    if (this.points.length < 2) return 0;
    const p0 = this.points[0];
    const pN = this.points[this.points.length - 1];
    return Math.atan2(pN.position.y - p0.position.y, pN.position.x - p0.position.x) - Math.PI / 2;
  }
}
