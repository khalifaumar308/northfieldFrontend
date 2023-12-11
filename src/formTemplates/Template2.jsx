import { PDFViewer, renderToFile } from "@react-pdf/renderer";
import { logo1 } from "../assets";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
  Font,
} from "@react-pdf/renderer";

import { template2data } from "../data/data";

const Template2 = () => {
  const { details, subjects, specailAreas, affectiveAssesment } = template2data;
  const subjectEntries = Object.entries(subjects)
  const specailAreasEntries = Object.entries(specailAreas)
  const scores = subjectEntries.map(([subject, scores],id) => {
    const { CA1, CA2, Proj, exam, average, comment } = scores;
    const total = CA1 + CA2 + Proj + exam;
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
        key={id}
      >
        <Text
          style={{
            width: "93px",
            borderBottom: "2px solid black",
            borderRight: "2px solid black",
            textTransform: "capitalize",
            fontSize: "8px",
            padding: "2px",
          }}
        >
          {subject}
        </Text>
        <Text
          style={{
            borderBottom: "2px solid black",
            borderRight: "2px solid black",
            padding: "2px",
            width: "48px",
            textAlign: "center",
            fontSize: "8px",
          }}
        >
          {CA1}
        </Text>
        <Text
          style={{
            borderBottom: "2px solid black",
            borderRight: "2px solid black",
            padding: "2px",
            width: "47px",
            textAlign: "center",
            fontSize: "8px",
          }}
        >
          {CA2}
        </Text>
        <Text
          style={{
            borderBottom: "2px solid black",
            borderRight: "2px solid black",
            padding: "2px",
            width: "47px",
            textAlign: "center",
            fontSize: "8px",
          }}
        >
          {Proj}
        </Text>
        <Text
          style={{
            borderBottom: "2px solid black",
            borderRight: "2px solid black",
            padding: "2px",
            width: "47px",
            textAlign: "center",
            fontSize: "8px",
          }}
        >
          {exam}
        </Text>
        <Text
          style={{
            borderBottom: "2px solid black",
            borderRight: "2px solid black",
            padding: "2px",
            width: "50px",
            textAlign: "center",
          }}
        >
          {total}
        </Text>
        <Text
          style={{
            borderBottom: "2px solid black",
            borderRight: "2px solid black",
            padding: "2px",
            width: "55px",
            textAlign: "center",
            fontSize:'8px'
          }}
        >
          {average}
        </Text>
        <Text
          style={{
            borderBottom: "2px solid black",
            borderRight: "2px solid black",
            padding: "2px",
            width: "190px",
            textAlign: "justipy",
          }}
        >
          {comment}
        </Text>
      </View>
    );
  });
  const grades = [
    ["90 -- 100", "Excellent"],
    ["80 -- 89", "Very Good"],
    ["70 -- 79", "Good"],
    ["61 -- 69", "Average"],
    ["50 -- 60", "Fair"],
    ["49 and Below", "Below Average"],
  ].map(([range, comment], id) => {
    return (
      <View key={id}>
        <View
          style={[
            {
              borderTop: "2px solid black",
              borderBottom: "2px solid black",
              fontSize: "10px",
              padding: "3px",
              width: "80px",
              borderLeft: "2px solid black",
              marginLeft: "-4px",
              marginRight: "-4px",
              backgroundColor: "gray",
            },
            id == 5 ? { borderRight: "2px solid black" } : {},
          ]}
        >
          <Text style={{ borderBottom: "2px solid black" }}>{range}</Text>
          <Text>{comment}</Text>
        </View>
      </View>
    );
  })

  return (
    <Document title="Motfield Montessori">
      <Page size="A4" style={{ padding: "8px", position:'relative' }}>
        <View
          style={{
            padding: "0 15%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            verticalAlign: "middle",
          }}
        >
          <Image style={{ width: "90px" }} src={logo1}></Image>
          <View
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text>
              <Text style={{ fontSize: "20px" }}>Northfield</Text> Montessori
              Academy
            </Text>
            <Text
              style={{
                fontSize: "7px",
                position: "absolute",
                bottom: "-3px",
                right: "2px",
              }}
            >
              Hands-on learning. Critical thinking
            </Text>
          </View>
        </View>
        <View
          style={{
            borderBottom: "2px solid black",
            display: "flex",
            flexDirection: "row",
            alignContent: "space-between",
            paddingBottom: "4px",
            alignItems: "center",
          }}
        >
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Text style={{ fontSize: "8px", borderBottom: "1px solid black" }}>
              School Premises
            </Text>
            <Text style={{ fontSize: "6px" }}>No 5 Lamido Road</Text>
            <Text style={{ fontSize: "6px" }}>Off Lamido Crescent,</Text>
            <Text style={{ fontSize: "6px" }}> Nassarawa, Kano</Text>
            <Text style={{ fontSize: "6px" }}>07087878713</Text>
          </View>
          <View>
            <Text
              style={{
                marginHorizontal: "28%",
                fontSize: "14px",
                fontWeight: "extrabold",
                color: "green",
              }}
            >
              FIRST TERM REPORT CARD
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: "8px", borderBottom: "1px solid black" }}>
              Registered Address
            </Text>
            <Text style={{ fontSize: "6px" }}>502 Dukawa Qtrs</Text>
            <Text style={{ fontSize: "6px" }}>Opp Buk Old Site Gate</Text>
            <Text style={{ fontSize: "6px" }}>BUK Road, Kano</Text>
            <Text style={{ fontSize: "6px" }}>08092288266</Text>
          </View>
        </View>
        <View
          style={{
            borderBottom: "2px solid black",
            display: "flex",
            flexDirection: "row",
            alignContent: "space-between",
            padding: "2px",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontSize: "9px", marginRight: "2px" }}>NAME:</Text>
            <Text style={{ fontSize: "7px", fontStyle: "italic" }}>
              Asmau Garba
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "25%",
              marginRight: "25%",
            }}
          >
            <Text style={{ fontSize: "9px", marginRight: "2px" }}>GRADE:</Text>
            <Text style={{ fontSize: "9px", fontStyle: "italic" }}>4</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ fontSize: "9px", marginRight: "2px" }}>
              ATTENDANCE
            </Text>
            <Text style={{ fontSize: "7px", fontStyle: "italic" }}>
              (Absent: 12 days)
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            borderTop: "2px solid black",
            borderBottom: "2px solid black",
            marginTop: "2px",
            backgroundColor: "gray",
          }}
        >
          <Text
            style={{
              fontSize: "10px",
              borderLeft: "2px solid black",
              borderRight: "2px solid black",
              padding: "3px",
              width: "100px",
            }}
          >
            SUBJECT
          </Text>
          <Text
            style={{
              borderRight: "2px solid black",
              padding: "3px",
              width: "50px",
              fontSize: "10px",
            }}
          >
            CA1(15)
          </Text>
          <Text
            style={{
              borderRight: "2px solid black",
              padding: "3px",
              width: "50px",
              fontSize: "10px",
            }}
          >
            CA2(15)
          </Text>
          <Text
            style={{
              borderRight: "2px solid black",
              padding: "3px",
              width: "50px",
              fontSize: "10px",
            }}
          >
            Proj(10)
          </Text>
          <Text
            style={{
              borderRight: "2px solid black",
              padding: "3px",
              width: "50px",
              fontSize: "10px",
            }}
          >
            EXAM(60)
          </Text>
          <Text
            style={{
              borderRight: "2px solid black",
              padding: "3px",
              width: "50px",
              fontSize: "10px",
            }}
          >
            TOTAL
          </Text>
          <Text
            style={{
              borderRight: "2px solid black",
              padding: "3px",
              width: "60px",
              fontSize: "10px",
            }}
          >
            Average:
          </Text>
          <Text
            style={{
              borderRight: "2px solid black",
              padding: "3px",
              width: "200px",
              fontSize: "10px",
            }}
          >
            TARGETS/COMMENTS
          </Text>
        </View>
        <View
          style={{
            borderLeft: "2px solid black",
            fontSize: "7px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {scores}
        </View>
        <View
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "row",
            marginLeft: "15px",
          }}
        >
          <View
            style={{
              borderTop: "2px solid black",
              borderBottom: "2px solid black",
              fontSize: "10px",
              padding: "3px",
              width: "100px",
              borderLeft: "2px solid black",
              backgroundColor: "gray",
            }}
          >
            <Text style={{ borderBottom: "2px solid black" }}>Grade</Text>
            <Text>Range</Text>
          </View>
          {grades}
        </View>
        <View
          style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
        >
          <View>
            <Text
              style={{
                backgroundColor: "gray",
                width: "250px",
                border: "2px solid black",
                fontSize: "12px",
                padding: "3px",
              }}
            >
              SPECIAL AREAS
            </Text>
            <View
              style={{
                borderBottom: "2px solid black",
                borderLeft: "2px solid black",
                borderRight: "2px solid black",
                fontSize: "8px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <View style={{ width: "80px" }}></View>
              <Text style={{ width: "50px" }}>BEHAVIOR</Text>
              <Text style={{ width: "50px" }}>EFFORT</Text>
              <Text style={{ width: "50px" }}>SKILL</Text>
            </View>
            {specailAreasEntries.map(
              ([area, { behavior, effort, skill }], id) => {
                return (
                  <View
                    key={id}
                    style={{
                      fontSize: "8px",
                      display: "flex",
                      flexDirection: "row",
                      textAlign: "center",
                    }}
                  >
                    <Text
                      style={{
                        textTransform: "uppercase",
                        borderLeft: "2px solid black",
                        borderBottom: "2px solid black",
                        width: "80px",
                        padding: "3px",
                      }}
                    >
                      {area}
                    </Text>
                    <Text
                      style={{
                        textTransform: "uppercase",
                        borderLeft: "2px solid black",
                        borderBottom: "2px solid black",
                        padding: "3px",
                        width: "50px",
                      }}
                    >
                      {behavior}
                    </Text>
                    <Text
                      style={{
                        textTransform: "uppercase",
                        borderLeft: "2px solid black",
                        borderBottom: "2px solid black",
                        padding: "3px",
                        width: "50px",
                      }}
                    >
                      {effort}
                    </Text>
                    <Text
                      style={{
                        textTransform: "uppercase",
                        borderLeft: "2px solid black",
                        borderBottom: "2px solid black",
                        borderRight: "2px solid black",
                        padding: "3px",
                        width: "70px",
                      }}
                    >
                      {skill}
                    </Text>
                  </View>
                );
              }
            )}
          </View>
          <View
            style={{
              marginLeft: "100px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                backgroundColor: "gray",
                border: "2px solid black",
                fontSize: "10px",
                display: "flex",
                flexDirection: "row",
                padding: "3px",
              }}
            >
              <Text style={{ width: "150px" }}>AFFECTIVE ASSESMENT</Text>
              <Text>RATING</Text>
            </View>
            {Object.entries(affectiveAssesment).map(([ass, rating], id) => {
              return (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    fontSize: "8px",
                    textTransform: "uppercase",
                    borderLeft: "2px solid black",
                    borderRight: "2px solid black",
                    borderBottom: "2px solid black",
                  }}
                  key={id}
                >
                  <Text
                    style={{
                      width: "150px",
                      borderRight: "2px solid black",
                      padding: "3px",
                    }}
                  >
                    {ass}
                  </Text>
                  <Text
                    style={{
                      padding: "3px",
                    }}
                  >
                    {rating}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View
          style={{
            borderBottom: "2px solid black",
            width: "100%",
            marginTop: "8px",
            padding: "3px",
            fontSize: "10px",
            flexDirection: "row",
          }}
        >
          <Text style={{ marginRight: "20px" }}>S - Stisfactory</Text>
          <Text>N - Needs Improvement</Text>
        </View>
        {/* <View style={{ marginTop: "50px" }}>
          <View
            style={{
              padding: "4px",
              borderBottom: "2px solid black",
              width: "110px",
              position: "relative",
            }}
          >
            <Image
              style={{ width: "100px" }}
              src={
                JSON.parse(sessionStorage.getItem("teacherDetails")).signature
              }
            />
            <Text style={{
              position: 'absolute',
              fontSize: '8px',
              bottom:'-15px'
            }}>Teacher`&apos;`s Signature</Text>
          </View>
        </View> */}
        <Image style={{ position:'absolute'}} src={logo1} ></Image>
      </Page>
    </Document>
  );
}

export default Template2