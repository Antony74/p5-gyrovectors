# Non-Euclidean gyrovectors rock; this sketch sucks #1 - Euclidean regular polygons fail to close in non-Euclidean space

Here's the [live version](https://antony74.github.io/p5-gyrovectors/dist/) and the [source code](https://github.com/Antony74/p5-gyrovectors).

I've written a gyrovector package, very similar to how the p5.Vector class works, but generalized to any number of spatial dimensions and any curvature of space.

Now I'm determined to have some fun with it, even if I have got off to a slightly shaky start.

Non-Euclidean hyperbolic and spherical geometries are weird, but fun to explore.  The familiarity that we should have from living on an elliposid apparently doesn't count for much. 

This sketch is a demonstration of how to construct regular polygons in Euclidean space, and of how it breaks in non-Euclidean space.

We're used to the sum of a triangle's angles adding up to π/2 (180 degrees).  But, as can be inferred from this animation, in hyperbolic geometry it's less than that, and in spherical geometry it's more.  But how much less or more?!   That's something I've so far been unable to find out.

Next I want to do a soccer ball tiling, and/or the [hyperbolic version](https://en.wikipedia.org/wiki/Truncated_order-7_triangular_tiling), so I guess I'll just have to close my polygons by eye for now.  Getting these tiling's working will give me much more faith in this gyrovector endeavor.

If you want to play too, [the gyrovector package is in the npm repository](https://www.npmjs.com/package/gyrovector).
