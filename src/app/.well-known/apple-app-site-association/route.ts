const appleAppSiteAssociation = {
  applinks: {
    apps: [],
    details: [
      {
        appIDs: ["5CC3T43XKF.com.sebdeluca.TravelStack"],
        components: [
          {
            "/": "/open",
          },
          {
            "/": "/invite/*",
          },
        ],
      },
    ],
  },
};

export const dynamic = "force-static";

export function GET() {
  return Response.json(appleAppSiteAssociation, {
    headers: {
      "content-type": "application/json",
    },
  });
}
