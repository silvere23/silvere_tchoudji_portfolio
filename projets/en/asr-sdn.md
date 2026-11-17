## The problem

In a traditional enterprise network, an attack detected by an IDS raises an alert, then a human has to analyse it, decide and act on the network equipment. That delay gives the attacker time to move further. ASR-SDN (Automated Security Response for Software-Defined Networks) aims to cut that delay down to a fraction of a second.

## The architecture

The network is controlled centrally thanks to SDN. Three building blocks work together:

- **Suricata** analyses the traffic, received as a mirror through a GRE tunnel, and raises alerts;
- **a Python orchestration engine**, running as a systemd service, gives each alert a severity score and chooses an action;
- **the ONOS controller** receives that decision through its REST API and pushes OpenFlow rules to the Open vSwitch switches.

Depending on the score, the suspicious host is isolated, its traffic is blocked or a network zone is segmented. Every decision is logged, and every rule can be removed to return to normal.

## The lab

The lab runs on three Ubuntu Server virtual machines: ONOS in Docker on the first, Mininet and Open vSwitch on the second, Suricata and the SOC workstation on the third. The topology mirrors enterprise zones: users, web, database, administration, plus an attacker host. The Les Menus Services network was used as the case study.

## The results

Six scenarios were validated end to end:

- normal operation, with no loss;
- TCP scan detected, then host isolated;
- ICMP flood detected, then traffic blocked;
- segmentation between zones;
- rule reversibility, back to normal;
- measuring the impact of a denial of service on availability.

The average time between detection and the rule being applied is about **0.09 seconds**.

## What I take away

This project had me working on the whole chain: networking, detection, development, automation and the regulatory framework (ANSSI, NIS2, NIST SP 800-207, ISO 27001). The natural next step is to add an AI analysis layer, running locally, alongside the rule engine.
